# Stage 0. Copy required files
FROM node:21-alpine as stage0

# Set working directory
ARG PROJECT_DIR
ARG VIRTUAL_PORT
WORKDIR ${PROJECT_DIR}

# Copy required files
COPY --chown=node:node package.json yarn.lock ./
COPY --chown=node:node scripts/start.sh ./scripts/

# Assign working directory to node
RUN chown -R node:node .

# Stage 1. Copy files from stage 0, and install yarn packages
FROM node:21-alpine as stage1

# Set working directory
ARG PROJECT_DIR
WORKDIR ${PROJECT_DIR}

# Copy entire working directory contents from stage 2, and install yarn packages
COPY --from=stage0 ${PROJECT_DIR} ./

# Install global packages
RUN yarn global add vite@5.2.13

# Stage 2. Copy files from stage 1
FROM node:16-alpine as stage2

# Set working directory
ARG PROJECT_DIR
WORKDIR ${PROJECT_DIR}

# Copy entire working directory contents from stage 1
COPY --from=stage1 ${PROJECT_DIR} ./

# Copy global yarn packages from stage 1
COPY --from=stage1 /usr/local/share/.config/yarn/global /usr/local/share/.config/yarn/global

# Set port
EXPOSE ${VIRTUAL_PORT}
