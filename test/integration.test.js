const supertest = require('supertest');
const axios = require('axios');
const server = require('../index');

// Added to avoid Jest error when server is not properly closed
afterAll(async done => {
    await server.close(done);
});

jest.mock("axios");

describe('integration', function () {
    axios.get.mockImplementation(() => Promise.resolve({data: {cat: 'cat'}}));
    it('should return 200 on correct requests', async function () {
        await supertest(server)
            .get('/search')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
    });

    it('should return 500 on failed requests', async function () {
        axios.get.mockImplementation(() => Promise.reject({statusCode: 500, error: 'Error'}));
        await supertest(server)
            .get('/search')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(500)
    });

    it('should return 404 on other requests', async function () {
        await supertest(server)
            .get('/oopsIGotLost')
            .set('Accept', 'application/json')
            .expect('Content-Type', /text/)
            .expect(404)
    });
});