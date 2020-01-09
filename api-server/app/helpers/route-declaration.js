module.exports = async function(fastify, opts, done) {
    Object.keys(opts).forEach(service => {
        Object.keys(opts[service]).forEach(route => {
            Object.keys(opts[service][route]).forEach(method => {
                const url = route == 'root' ? '/' : `/${service}/${route}`;

                fastify.route({
                    method,
                    url,
                    schema: opts[service][route][method].schema,
                    handler: opts[service][route][method].handler,
                });
            });
        });
    });

    done();
};
