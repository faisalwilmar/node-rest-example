const expect = require('chai').expect; //https://www.chaijs.com/api/bdd/
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const requester = chai.request('http://localhost:3000')

const GlobalVariables = require('./global-variable');
const globVar = new GlobalVariables();
const token = globVar.getValidToken();

describe('Barang GET Test', () => {
    it('should have status 401 and Token Not Provided', (done) => {
        requester.get('/barangs')
            .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res.body.error.message).to.equal('Invalid Token or Token Not Provided');
                done();
            })
    })

    it('should have status 401 and Jwt Must Be Provided', (done) => {
        requester.get('/barangs')
            .set('Authorization', 'xyz')
            .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res.body.error.message).to.equal('jwt must be provided');
                done();
            })
    })

    it('should have status 401 and Jwt Malformed', (done) => {
        requester.get('/barangs')
            .set('Authorization', 'stupid token')
            .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res.body.error.message).to.equal('jwt malformed');
                done();
            })
    })

    it('should have status 401 and jwt expired', (done) => {
        requester.get('/barangs')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZhaXNhbHdpbG1hckBnbWFpbC5jb20iLCJ1c2VySWQiOiI1ZDYzN2YxNGYwMTlkNTE2OTA0M2EzMzUiLCJpYXQiOjE1OTY3MTQ2NjUsImV4cCI6MTU5Njg4NzQ2NX0.0YLYfj_BJwHqy3mhBjT_jOrd1z5avqxGViqoxm0xJj4')
            .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res.body.error.message).to.equal('jwt expired');
                done();
            })
    })

    it('should have status 200 and response body as array', (done) => {
        requester.get('/barangs')
            .set('Authorization', token)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('barangs');
                expect(res.body.barangs).to.be.a('array');
                done();
            })
    })

    // This case designed to fail
    it('should have status 200 and response body as object (a single barang)', (done) => {
        const id = 1;
        requester.get(`/barangs/${id}`)
            .set('Authorization', token)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property('id');
                expect(res.body).to.have.property('nama_barang');
                // expect(res.body).to.have.property('name');
                expect(res.body).to.have.property('harga');
                // expect(res.body).to.have.property('price');
                done();
            })
    })
});

describe('Barang POST Test', () => {
    it('should have status 400 and Request Body Incomplete', (done) => {
        const localBarang = {
            "id": "6",
            "nama_barang": "Sapiens"
        };

        requester.post('/barangs')
            .set('Authorization', token)
            .send(localBarang)
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body.error.message).to.equal('Request Body Incomplete');
                done();
            })
    })

    it('should have status 201 and response body as object', (done) => {
        const localBarang = {
            "id": "6",
            "nama_barang": "Homodeus",
            "harga": "90000"
        };

        requester.post('/barangs')
            .set('Authorization', token)
            .send(localBarang)
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('createdBarang');
                expect(res.body.createdBarang).to.be.a('object');
                expect(res.body.createdBarang).to.have.property('id');
                expect(res.body.createdBarang).to.have.property('nama_barang');
                expect(res.body.createdBarang).to.have.property('harga');
                expect(res.body.createdBarang.id).to.equal(localBarang.id);
                expect(res.body.createdBarang.nama_barang).to.equal(localBarang.nama_barang);
                expect(res.body.createdBarang.harga).to.equal(localBarang.harga);
                done();
            })
    })
})
