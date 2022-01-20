#!/bin/sh

# Production build extra steps
if [ "${NODE_ENV}" = "production" ]; then
    # Build project
    yarn build
fi

# Start project
yarn start-${NODE_ENV}