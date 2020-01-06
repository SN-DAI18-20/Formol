const fastify = require("fastify")({ logger: true });

// Register routes
fastify.register("./views/v1", { prefix: "/v1" });

// Start the Web server
fastify.listen(HTTP_PORT, HTTP_BIND, (err, addr) => {
    if (err) throw err;

    fastify.log.info(`Formol's API server is listening on ${addr}`);
});
