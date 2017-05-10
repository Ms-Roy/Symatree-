/**
 * Created by ericdufresne on 2017-03-07.
 */
var chai = require('chai');
var should = chai.should;
var server = require('../../server');
var uuid4 = require('uuid/v4');

module.exports = function () {
    it('success = true, status 200. Returns updated companies object.', function (done) {
        auth(function (token) {
            createNewCompany(token, function (company) {
                var updateParams = {website: 'http://someting.com', name: 'Readable Name', _id: 'asdf'};
                chai.request(server).put('/api/companies/'+company._id).set('theaters-auth',token).send(updateParams).end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.not.have.property('_id');
                    res.body.should.have.property('website').eq(updateParams.website);
                    res.body.should.have.property('name').eq(updateParams.name);
                    done();
                });
            });
        });
    });
    it('success = false, status 400. Bad update parameters sent.', function (done) {
        auth(function (token) {
            createNewCompany(token, function (company) {
                var updateParams = {name: ''};
                chai.request(server).put('/api/companies/'+company._id).set('theaters-auth',token).send(updateParams).end(function (err, res) {
                    res.should.have.status(400);
                    res.body.should.have.property('success').eq(false);
                    done();
                });
            });
        });
    });
    it('success = false, status 409. Update parameter conflicts with existing company', function (done) {
        auth(function (token) {
            createNewCompany(token, function (company) {
                createNewCompany(token, function (updateCompany) {
                    var updateParams = {name: company.name};
                    chai.request(server).put('/api/companies/'+updateCompany._id).set('theaters-auth', token).send(updateParams).end(function (err, res) {
                        res.should.have.status(409);
                        res.body.should.have.property('success').eq(false);
                        done();
                    });
                });
            });
        });
    });
    it('success = false, status 404. Company does not exist with id', function (done) {
        auth(function (token) {
            chai.request(server).put('/api/companies/'+uuid4()).set('theaters-auth',token).send({name: 'Some different name'}).end(function (err, res) {
                res.should.have.status(404);
                res.body.should.have.property('success').eq(false);
                done();
            });
        });
    });
    it('success = false, status 403. This user is not allowed to modify this company', function (done) {
        auth(function (token1) {
            createNewCompany(token1, function (company) {
                auth(function (token2) {
                    var updateParams = {name: uuid4()};
                    chai.request(server).put('/api/companies/'+company._id).set('theaters-auth', token2).send(updateParams).end(function (err, res) {
                        res.should.have.status(403);
                        res.body.should.have.property('success').eq(false);
                        done();
                    });
                });
            });
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
function createNewCompany(token, cb){
    var newCompany = {
        name: uuid4(),
        country: 'Canada',
        contactEmail: uuid4(),
        phoneNumber: '905-920-3672',
        website: 'www.google.gov',
        address: '195 Wilson St W, Ancaster, Ontario'
    };
    chai.request(server).post('/api/companies').set('theaters-auth', token).send(newCompany).end(function (err, res) {
        res.should.have.status(201);
        res.body.should.have.property('_id');
        cb(res.body);
    });
}