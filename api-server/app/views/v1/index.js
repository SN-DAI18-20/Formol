const pjson = require("../../../package.json");

module.exports = function (fastify, opts, done) {
    // Define v1 routes

    // Define Swagger route
    fastify.register(require("fastify-swagger"), {
        routePrefix: "/schema",
        swagger: {
            info: {
                title: "Formol APIv1 swagger schema",
                version: pjson.version
            }
        }
    });

    done();
};
