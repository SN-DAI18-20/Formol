const fastify = require('../../../app/server');

describe('Test /v1/authentication/signup route', () => {
    it('should returns schema error', async () => {
        // Test without any params in body
        let request = await fastify.inject({
            method: 'POST',
            url: '/v1/authentication/signup',
            body: {},
        });

        expect(request.statusCode).toEqual(400);
        expect(JSON.parse(request.body).message).toEqual(
            `body should have required property 'username', body `+
            `should have required property 'email', body should have `+
            `required property 'password'`
        );

        // Test with only one params in body
        request = await fastify.inject({
            method: 'POST',
            url: '/v1/authentication/signup',
            body: {
                username: 'lapin',
            },
        });

        expect(request.statusCode).toEqual(400);
        expect(JSON.parse(request.body).message).toEqual(
            `body should have required property 'email', body should ` +
            `have required property 'password'`
        );
    });

    it('should successfuly create a user', async () => {
        const request = await fastify.inject({
            method: 'POST',
            url: '/v1/authentication/signup',
            body: {
                username: 'lapin',
                password: 'blablabla!',
                email: 'bla@bla.fr'
            },
        });

        expect(request.statusCode).toEqual(201);
        expect(JSON.parse(request.body).message).toEqual(`User createddd.`);
    });

});
