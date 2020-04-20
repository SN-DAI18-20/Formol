#!/usr/bin/env sh

# Run the command if specified on the service execution
[[ ! -z "$@" ]] && exec $@

# Run migrations if the environment variable is set
if [[ "$RUN_MIGRATIONS" == true ]]; then
    echo "Running SQL migrations for the API..."
    $PWD/node_modules/.bin/sequelize db:migrate
fi

# Run the application in PRODUCTION environment if the variable environment is
# set to "PRODUCTION". Otherwise, it will boot the application in development
# mode.
if [[ "$NODE_ENV" == "PRODUCTION" ]]; then
    npm start
else
    npm run dev
fi
