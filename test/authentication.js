const { compareSync } = require('bcrypt');

const expect = require('chai').expect;

const authMiddleware = require('../api/middleware/check-auth');

describe('Authorization Test', () => {
    it('should throw error if no authorization header present', () => {
        const req = {
            headers: {
                authorization: null
            }
        };

        expect(authMiddleware.bind(req, {}, () => { })).to.throw("Invalid Token or Token Not Provided");
    })
});

//METHOD ABOVE IS GOOD FOR TESTING FUNCTION
//FOR REST API, READ THIS https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai AND https://github.com/chaijs/chai-http#setting-up-requests