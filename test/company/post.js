/**
 * Created by ericdufresne on 2017-03-07.
 */
var server = require('../../server');
var chai = require('chai');
var should = chai.should;
var uuid4 = require('uuid/v4');
var jwt = require('jwt-simple');

module.exports = function () {
    it('Returns success = true, status 201. Created new company successfully', function (done) {
        auth(function (token) {
            var newCompany = createNewCompany();
            chai.request(server).post('/api/companies').send(newCompany).set('theaters-auth',token).end(function (err, res) {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('name').eq(newCompany.name);
                res.body.should.have.property('country').eq(newCompany.country);
                res.body.should.have.property('phoneNumber').eq(newCompany.phoneNumber);
                res.body.should.have.property('website').eq(newCompany.website);
                res.body.should.have.property('address').eq(newCompany.address);
                res.body.should.have.property('contactEmail').eq(newCompany.contactEmail);
                res.body.should.have.property('_id');
                done();
            });
        });

    });
    it('Returns success = false, status 400. Missing a required parameter to create a company', function (done) {
        auth(function (token) {
            var newCompany = {
                country: 'Canada',
                contactEmail: 'e-dufresne2@hotmail.com',
                phoneNumber: '905-920-3672',
                website: 'www.google.gov',
                address: '195 Wilson St W, Ancaster, Ontario'
            };
            chai.request(server).post('/api/companies').send(newCompany).set('theaters-auth',token).end(function (err, res) {
                res.should.have.status(400);
                res.body.should.have.property('success').eq(false);
                done();
            });
        });
    });
    it('Returns success = false, status 409. Company with the same name already exists.', function (done) {
        auth(function (token) {
            var newCompany = createNewCompany();
            chai.request(server).post('/api/companies').send(newCompany).set('theaters-auth',token).end(function (err, res) {
                res.should.have.status(201);
                chai.request(server).post('/api/companies').send(newCompany).set('theaters-auth',token).end(function (err, res) {
                    res.should.have.status(409);
                    res.body.should.have.property('success').eq(false);
                    done();
                });
            });
        });
    });
    it('Returns sucesss = false, status 403. No token provided. Cannot auth', function (done) {
        var newCompany = createNewCompany();
        chai.request(server).post('/api/companies').send(newCompany).end(function (err, res) {
            res.should.have.status(403);
            res.body.should.have.property('success').eq(false);
            done();
        });
    });
    it('Returns success = false, status 403. Bad token provided. Cannot auth', function (done) {
        var fakeUser = {
            email: uuid4(),
            password: uuid4(),
            fullName: uuid4()
        };
        var fakeToken = jwt.encode(fakeUser, 'token');
        var newCompany = createNewCompany();
        chai.request(server).post('/api/companies').send(newCompany).set('theaters-auth',fakeToken).end(function (err, res) {
            res.should.have.status(403);
            res.body.should.have.property('success').eq(false);
            done();
        });
    });
};
function auth(cb) {
    var newUser = {
        email: uuid4(),
        password: uuid4(),
        fullName: uuid4()
    };
    chai.request(server).post('/api/signup').send(newUser).end(function (err, res) {
        res.should.have.status(201);
        res.body.should.have.property('token');
        var token = res.body.token;
        cb(token);
    });
}
function createNewCompany(){
    return {
        name: uuid4(),
        country: 'Canada',
        contactEmail: uuid4(),
        phoneNumber: '905-920-3672',
        website: 'www.google.gov',
        address: '195 Wilson St W, Ancaster, Ontario'
    };
}