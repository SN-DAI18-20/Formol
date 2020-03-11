const HttpMethods = [
    'GET',
    'POST',
    'PATCH',
    'PUT',
    'DELETE',
    'HEAD',
    'OPTIONS',
];

module.exports = async function(fastify, opts, done) {
    function discoverObject(obj, url) {
        let routes = [];

        Object.keys(obj).forEach(key => {
            if (HttpMethods.indexOf(key) != -1) {
                routes.push({
                    method: key,
                    url: url,
                    schema: obj[key].schema,
                    handler: obj[key].handler,
                });
            } else {
                routes = routes.concat(
                    discoverObject(obj[key], `${url}/${key}`)
                );
            }
        });

        return routes;
    }

    Object.keys(opts).forEach(key => {
        const rootPath = key === 'root' ? '/' : `/${key}`;
        const routes = discoverObject(opts[key], rootPath);

        for(let i = 0; i < routes.length; i++) {
            fastify.route({
                method: routes[i].method,
                url: routes[i].url,
                schema: routes[i].schema,
                handler: routes[i].handler,
            });
        }
    });

    done();
};
