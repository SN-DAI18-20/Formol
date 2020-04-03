#!/usr/bin/env sh

# Run the command if specified on the service execution
[[ ! -z "$@" ]] && exec $@

# Run the application in PRODUCTION environment if the variable environment is
# set to "PRODUCTION". Otherwise, it will boot the application in development
# mode.
if [[ "$NODE_ENV" == "PRODUCTION" ]]; then
    npm run docker:start
else
    npm run docker:dev
fi
