#!/bin/bash
# NOTE 1: Run outside of Docker container, on production server
# NOTE 2: First run build.sh on development server
# NOTE 3: If docker-compose file was changed since the last build, you should prune the containers and images before running this script.
# Finishes up the deployment process, which was started by build.sh:
# 1. Checks if Nginx containers are running
# 2. Copies current database and build to a safe location, under a temporary directory.
# 3. Runs git fetch and git pull to get the latest changes.
# 4. Runs setup.sh
# 5. Moves build created by build.sh to the correct location.
# 6. Restarts docker containers
#
# Arguments (all optional):
# -v: Version number to use (e.g. "1.0.0")
# -n: Nginx proxy location (e.g. "/root/NginxSSLReverseProxy")
# -l: Project location (e.g. "/root/matthalloran.info")
# -h: Show this help message
HERE=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
source "${HERE}/prettify.sh"

# Read arguments
SETUP_ARGS=()
for arg in "$@"; do
    case $arg in
    -v | --version)
        VERSION="${2}"
        shift
        shift
        ;;
    -n | --nginx-location)
        NGINX_LOCATION="${2}"
        shift
        shift
        ;;
    -h | --help)
        echo "Usage: $0 [-v VERSION] [-n NGINX_LOCATION] [-h]"
        echo "  -v --version: Version number to use (e.g. \"1.0.0\")"
        echo "  -n --nginx-location: Nginx proxy location (e.g. \"/root/NginxSSLReverseProxy\")"
        echo "  -h --help: Show this help message"
        exit 0
        ;;
    *)
        SETUP_ARGS+=("${arg}")
        shift
        ;;
    esac
done

# Extract the current version number from the package.json file
CURRENT_VERSION=$(cat ${HERE}/../package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[",]//g' | tr -d '[[:space:]]')
# Ask for version number, if not supplied in arguments
if [ -z "$VERSION" ]; then
    prompt "What version number do you want to deploy? (current is ${CURRENT_VERSION}). Leave blank if keeping the same version number."
    warning "WARNING: Keeping the same version number will overwrite the previous build AND database backup."
    read -r ENTERED_VERSION
    # If version entered, set version
    if [ ! -z "$ENTERED_VERSION" ]; then
        VERSION=$ENTERED_VERSION
    else
        VERSION=$CURRENT_VERSION
    fi
fi

# Check if nginx-proxy and nginx-proxy-le are running
if [ ! "$(docker ps -q -f name=nginx-proxy)" ] || [ ! "$(docker ps -q -f name=nginx-proxy-le)" ]; then
    error "Proxy containers are not running!"
    if [ -z "$NGINX_LOCATION" ]; then
        prompt "Enter path to proxy container directory (defaults to /root/NginxSSLReverseProxy):"
        read -r NGINX_LOCATION
        if [ -z "$NGINX_LOCATION" ]; then
            NGINX_LOCATION="/root/NginxSSLReverseProxy"
        fi
    fi
    # Check if ${NGINX_LOCATION}/docker-compose.yml or ${NGINX_LOCATION}/docker-compose.yaml exists
    if [ -f "${NGINX_LOCATION}/docker-compose.yml" ] || [ -f "${NGINX_LOCATION}/docker-compose.yaml" ]; then
        # Start proxy containers
        cd "${NGINX_LOCATION}" && docker-compose up -d
    else
        error "Could not find docker-compose.yml file in ${NGINX_LOCATION}"
        exit 1
    fi
fi

# Copy current build to a safe location, under a temporary directory.
cd ${HERE}/..
BUILD_TMP="/var/tmp/${VERSION}/old-build"
BUILD_CURR="${HERE}/../dist"

# Stash old build if it doesn't already exists in /var/tmp.
if [ -d "${BUILD_TMP}" ]; then
    info "Old build already exists at ${BUILD_TMP}, so not moving it"
elif [ -d "${BUILD_CURR}" ]; then
    info "Moving old build to ${BUILD_TMP}"
    mv -f "${BUILD_CURR}" "${BUILD_TMP}"
    if [ $? -ne 0 ]; then
        error "Could not move build to ${BUILD_TMP}"
        exit 1
    fi
fi

# Extract the zipped build created by build.sh
BUILD_ZIP="/var/tmp/${VERSION}"
if [ -f "${BUILD_ZIP}/build.tar.gz" ]; then
    info "Extracting build at ${BUILD_ZIP}/build.tar.gz"
    mkdir -p "${BUILD_CURR}"
    tar -xzf "${BUILD_ZIP}/build.tar.gz" -C "${BUILD_CURR}" --strip-components=1
    if [ $? -ne 0 ]; then
        error "Failed to extract build at ${BUILD_ZIP}/build.tar.gz"
        exit 1
    fi
else
    error "Could not find build at ${BUILD_ZIP}/build.tar.gz"
    exit 1
fi

# Stop docker containers
info "Stopping docker containers..."
docker-compose down

# Pull the latest changes from the repository.
info "Pulling latest changes from repository..."
git fetch
git pull

# Running setup.sh
info "Running setup.sh..."
"${HERE}/setup.sh" "${SETUP_ARGS[@]}"
if [ $? -ne 0 ]; then
    error "setup.sh failed"
    exit 1
fi

# Move and decompress build created by build.sh to the correct location.
info "Moving and decompressing new build to correct location..."
rm -rf ${HERE}/../dist
tar -xzf /var/tmp/${VERSION}/build.tar.gz -C ${HERE}/..
if [ $? -ne 0 ]; then
    error "Could not move and decompress build to correct location"
    exit 1
fi

# Restart docker containers.
info "Restarting docker containers..."
docker-compose -f ${HERE}/../docker-compose-prod.yml up --build -d

success "Done! You may need to wait a minute for the Docker containers to finish starting up."
