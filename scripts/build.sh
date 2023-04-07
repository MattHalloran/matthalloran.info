#!/bin/bash
# NOTE: Run outside of Docker container
# Prepares project for deployment to VPS:
# 1. Asks for version number, and updates all package.json files accordingly.
# 2. Builds the React app, making sure to include environment variables and post-build commands.
# 3. Copies the build to the VPS, under a temporary directory.
#
# Arguments (all optional):
# -v: Version number to use (e.g. "1.0.0")
# -d: Deploy to VPS (y/N)
# -h: Show this help message
HERE=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
source "${HERE}/prettify.sh"

# Read arguments
while getopts "v:d:h" opt; do
    case $opt in
    v)
        VERSION=$OPTARG
        ;;
    d)
        DEPLOY=$OPTARG
        ;;
    h)
        echo "Usage: $0 [-v VERSION] [-d DEPLOY] [-h]"
        echo "  -v --version: Version number to use (e.g. \"1.0.0\")"
        echo "  -d --deploy: Deploy to VPS (y/N)"
        echo "  -h --help: Show this help message"
        echo "  -g --graphql-generate: Generate GraphQL tags for queries/mutations"
        exit 0
        ;;
    \?)
        echo "Invalid option: -$OPTARG" >&2
        exit 1
        ;;
    :)
        echo "Option -$OPTARG requires an argument." >&2
        exit 1
        ;;
    esac
done

# Load variables from .env file
if [ -f "${HERE}/../.env" ]; then
    source "${HERE}/../.env"
else
    error "Could not find .env file. Exiting..."
    exit 1
fi

# Check for required variables
check_var() {
    if [ -z "${!1}" ]; then
        error "Variable ${1} is not set. Exiting..."
        exit 1
    else
        info "Variable ${1} is set to ${!1}"
    fi
}
check_var SITE_IP

# Ask for version number, if not supplied in arguments
AUTO_DETECT_VERSION=false
if [ -z "$VERSION" ]; then
    prompt "What version number do you want to deploy? (e.g. 1.0.0). Leave blank if keeping the same version number."
    warning "WARNING: Keeping the same version number will overwrite the previous build."
    read -r VERSION
    # If no version number was entered, use the version number found in the package.json files
    if [ -z "$VERSION" ]; then
        info "No version number entered. Using version number found in package.json files."
        VERSION=$(cat ${HERE}/../package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[",]//g' | tr -d '[[:space:]]')
        info "Version number found in package.json files: ${VERSION}"
        AUTO_DETECT_VERSION=true
    fi
fi

# Update package.json files for every package, if version number was not auto-detected
if [ "${AUTO_DETECT_VERSION}" = false ]; then
    cd ${HERE}/..
    # Find every directory containing a package.json file, up to 3 levels deep
    for dir in $(find . -maxdepth 1 -name package.json -printf '%h '); do
        info "Updating package.json for ${dir}"
        # Go to directory
        cd ${dir}
        # Patch with yarn
        yarn version patch --new-version ${VERSION} --no-git-tag-version
        # Go back to packages directory
        cd ${HERE}/..
    done
fi

# Navigate to UI directory
cd ${HERE}/..

# Build React app
info "Building React app..."
yarn build
if [ $? -ne 0 ]; then
    error "Failed to build React app"
    exit 1
fi

# Copy build to VPS
if [ -z "$DEPLOY" ]; then
    prompt "Build successful! Would you like to send the build to the production server? (y/N)"
    read -r DEPLOY
fi

# Compress build
info "Compressing build..."
tar -czf build.tar.gz dist
trap "rm build.tar.gz" EXIT
if [ $? -ne 0 ]; then
    error "Failed to compress build"
    exit 1
fi

if [ "${DEPLOY}" = "y" ] || [ "${DEPLOY}" = "Y" ] || [ "${DEPLOY}" = "yes" ] || [ "${DEPLOY}" = "Yes" ]; then
    source "${HERE}/keylessSsh.sh"
    BUILD_DIR="${SITE_IP}:/var/tmp/${VERSION}/"
    prompt "Going to copy build to ${BUILD_DIR}. Press any key to continue..."
    read -r
    rsync -r build.tar.gz root@${BUILD_DIR}
    if [ $? -ne 0 ]; then
        error "Failed to copy build to ${BUILD_DIR}"
        exit 1
    fi
    success "build.tar.gz copied to ${BUILD_DIR}! To finish deployment, run deploy.sh on the VPS."
else
    BUILD_DIR="/var/tmp/${VERSION}"
    info "Copying build locally to ${BUILD_DIR}."
    # Make sure to create missing directories
    mkdir -p "${BUILD_DIR}"
    cp -p build.tar.gz ${BUILD_DIR}
    if [ $? -ne 0 ]; then
        error "Failed to copy build to ${BUILD_DIR}"
        exit 1
    fi
    success "build.tar.gz copied to ${BUILD_DIR}!"
fi
