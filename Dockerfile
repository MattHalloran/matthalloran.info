FROM node:14.17-alpine
EXPOSE 3000

# Set variables
ARG PROJECT_DIR
ENV ui=.

# Create directories with correct permissions
RUN mkdir -p ${PROJECT_DIR}/${ui}/node_modules/.cache &&\
    mkdir -p ${PROJECT_DIR}/${ui}/build &&\
    chown -R node:node ${PROJECT_DIR}

# Install global packages (must be done as the root user)
RUN yarn global add react-scripts serve

# Switch to a user with less permissions
USER node

# Set working directory
WORKDIR ${PROJECT_DIR}

# Copy packages over first. This helps with caching
COPY --chown=node:node package.json package.json
COPY --chown=node:node ${ui}/package.json ${ui}/package.json

# Install packages
RUN yarn install

# Copy rest of repo over
COPY --chown=node:node ${ui}/src ${ui}/public ${ui}/
COPY --chown=node:node start.sh .

USER root