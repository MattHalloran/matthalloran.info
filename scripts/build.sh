#!/bin/bash
# NOTE: Run outside of Docker container
# Prepares project for deployment via Docker Compose
HERE=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
. "${HERE}/prettify.sh"

# Read arguments
ENV_FILE="${HERE}/../.env-prod"
TEST="y"
while getopts "v:d:u:ha:e:t:" opt; do
    case $opt in
    h)
        echo "Usage: $0 [-v VERSION] [-d DEPLOY_VPS_VPS] [-h] [-a API_GENERATE] [-e ENV_FILE]"
        echo "  -v --version: Version number to use (e.g. \"1.0.0\")"
        echo "  -d --deploy-vps: Deploy to VPS? (y/N)"
        echo "  -h --help: Show this help message"
        echo "  -a --api-generate: Generate computed API information (GraphQL query/mutation selectors and OpenAPI schema)"
        echo "  -e --env-file: .env file location (e.g. \"/root/my-folder/.env\")"
        echo "  -t --test: Runs all tests to ensure code is working before building. Defaults to true. (y/N)"
        exit 0
        ;;
    a)
        API_GENERATE=$OPTARG
        ;;
    d)
        DEPLOY_VPS=$OPTARG
        ;;
    e)
        ENV_FILE=$OPTARG
        ;;
    t)
        TEST=$OPTARG
        ;;
    v)
        VERSION=$OPTARG
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
if [ -f "${ENV_FILE}" ]; then
    info "Loading variables from ${ENV_FILE}..."
    . "${ENV_FILE}"
else
    error "Could not find .env file at ${ENV_FILE}. Exiting..."
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
check_var UI_PORT
check_var SITE_IP

# Extract the current version number from the package.json file
CURRENT_VERSION=$(cat ${HERE}/../package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[",]//g' | tr -d '[[:space:]]')
# If version was entered (and it's different from the current version), set version
if [ ! -z "$VERSION" ] && [ "$VERSION" != "$CURRENT_VERSION" ]; then
    # Update package.json file
    cd ${HERE}/..
    info "Updating package.json"
    # Patch with yarn
    yarn version patch --new-version ${VERSION} --no-git-tag-version
else
    info "No version supplied, or version supplied is the current version. Sticking with version ${CURRENT_VERSION}."
    VERSION=$CURRENT_VERSION
fi

# Navigate to root directory
cd ${HERE}/..

# Run tests
if [[ "$TEST" =~ ^[Yy]([Ee][Ss])?$ ]]; then
    header "Running unit tests for UI..."
    yarn test
    header "Type checking UI..."
    yarn type-check
    if [ $? -ne 0 ]; then
        error "Failed to run unit tests for UI"
        exit 1
    fi
else
    warning "Skipping unit tests for UI..."
    warning "Skipping type checking for UI..."
fi

# Build React app
info "Building React app..."
yarn build
if [ $? -ne 0 ]; then
    error "Failed to build React app"
    exit 1
fi

# Create brave-rewards-verification.txt file
if [ -z "${BRAVE_REWARDS_TOKEN}" ]; then
    error "BRAVE_REWARDS_TOKEN is not set. Not creating dist/.well-known/brave-rewards-verification.txt file."
else
    info "Creating dist/.well-known/brave-rewards-verification.txt file..."
    mkdir dist/.well-known
    cd ${HERE}/../dist/.well-known
    echo "This is a Brave Rewards publisher verification file.\n" >brave-rewards-verification.txt
    echo "Domain: matthalloran.info" >>brave-rewards-verification.txt
    echo "Token: ${BRAVE_REWARDS_TOKEN}" >>brave-rewards-verification.txt
    cd ../..
fi

# Compress build TODO should probably compress builds for server and shared too, as well as all node_modules folders
info "Compressing build..."
tar -czf ${HERE}/../build.tar.gz -C ${HERE}/../dist .
trap "rm build.tar.gz" EXIT
if [ $? -ne 0 ]; then
    error "Failed to compress build"
    exit 1
fi

# Build Docker images
cd ${HERE}/..
info "Building (and Pulling) Docker images..."
docker-compose --env-file ${ENV_FILE} -f docker-compose-prod.yml build
docker pull ankane/pgvector:v0.4.4
docker pull redis:7-alpine

# Save and compress Docker images
info "Saving Docker images..."
docker save -o production-docker-images.tar ui:prod server:prod docs:prod ankane/pgvector:v0.4.4 redis:7-alpine
if [ $? -ne 0 ]; then
    error "Failed to save Docker images"
    exit 1
fi
trap "rm production-docker-images.tar*" EXIT
info "Compressing Docker images..."
gzip -f production-docker-images.tar
if [ $? -ne 0 ]; then
    error "Failed to compress Docker images"
    exit 1
fi

if [ -z "$DEPLOY_VPS" ]; then
    prompt "Would you like to send the build to the production server? (y/N)"
    read -n1 -r DEPLOY_VPS
    echo
fi

if [[ "$DEPLOY_VPS" =~ ^[Yy]([Ee][Ss])?$ ]]; then
    # Copy build to VPS
    "${HERE}/keylessSsh.sh" -e ${ENV_FILE}
    BUILD_DIR="${SITE_IP}:/var/tmp/${VERSION}/"
    prompt "Going to copy build and .env-prod to ${BUILD_DIR}. Press any key to continue..."
    read -n1 -r -s
    rsync -ri --info=progress2 -e "ssh -i ~/.ssh/id_rsa_${SITE_IP}" build.tar.gz production-docker-images.tar.gz root@${BUILD_DIR}
    # ENV_FILE must be copied as .env-prod since that's what deploy.sh expects
    rsync -ri --info=progress2 -e "ssh -i ~/.ssh/id_rsa_${SITE_IP}" ${ENV_FILE} root@${BUILD_DIR}/.env-prod
    if [ $? -ne 0 ]; then
        error "Failed to copy files to ${BUILD_DIR}"
        exit 1
    fi
    success "Files copied to ${BUILD_DIR}! To finish deployment, run deploy.sh on the VPS."
else
    # Copy build locally
    BUILD_DIR="/var/tmp/${VERSION}"
    info "Copying build locally to ${BUILD_DIR}."
    # Make sure to create missing directories
    mkdir -p "${BUILD_DIR}"
    cp -p build.tar.gz production-docker-images.tar.gz ${BUILD_DIR}
    if [ $? -ne 0 ]; then
        error "Failed to copy build.tar.gz and production-docker-images.tar.gz to ${BUILD_DIR}"
        exit 1
    fi
    # If building locally, use .env and rename it to .env-prod
    cp -p ${ENV_FILE} ${BUILD_DIR}/.env-prod
    if [ $? -ne 0 ]; then
        error "Failed to copy ${ENV_FILE} to ${BUILD_DIR}/.env-prod"
        exit 1
    fi
fi

success "Build process completed successfully! Now run deploy.sh on the VPS to finish deployment, or locally to test deployment."
