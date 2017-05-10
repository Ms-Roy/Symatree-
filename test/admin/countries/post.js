/**
 * Created by ericdufresne on 2017-03-15.
 */
var chai = require('chai');
var should = chai.should;
var server = require('../../../server');
var uuid4 = require('uuid/v4');
var User = require('../../../api/db/schema/user').User;

module.exports = function () {
    it('success = true. Status 201 Successfully added new country', function (done) {
        authAdmin(function (token) {
            var newCountry = {country: 'Canada'};
            chai.request(server).post('/api/countries').send(newCountry).set('theaters-auth', token).end(function (err, res) {
                res.should.have.status(201);
                res.body.should.have.property('_id');
                res.body.should.have.property('country').eq(newCountry.country);
                done();
            });
        });
    });
    it('success = false. Status 409. Conflicting country already exists', function (done) {
        authAdmin(function (token) {
            var newCountry = {country: 'Canada'};
            chai.request(server).post('/api/countries').send(newCountry).set('theaters-auth', token).end(function (err, res) {
                res.should.have.status(409);
                res.body.should.have.property('success').eq(false);
                done();
            });
        });
    });
    it('success = false. Status 403. Operation not allowed for regular users', function (done) {
        auth(function (token) {
            var newCountry = {country: 'Canada'};
            chai.request(server).post('/api/countries').send(newCountry).set('theaters-auth', token).end(function (err, res) {
                res.should.have.status(403);
                res.body.should.have.property('success').eq(false);
                done();
            });
        });
    });
    it('success = false. Status 400. Missing country attribute', function (done) {
        authAdmin(function (token) {
            var newCountry = {};
            chai.request(server).post('/api/countries').send(newCountry).set('theaters-auth', token).end(function (err, res) {
                res.should.have.status(400);
                res.body.should.have.property('success').eq(false);
                done();
            });
        });
    });

};
function auth(cb){
    var newUser = {
        fullName: 'Eric Dufresne',
        password: 'some-password',
        email: uuid4()
    };
    chai.request(server).post('/api/signup').send(newUser).end(function (err, res) {
        res.should.have.status(201);
        res.body.should.have.property('token');
        var token = res.body.token;
        chai.request(server).get('/api/auth/'+token).end(function (err, res) {
            cb(token);
        })
    })
}
function authAdmin(cb){
    var newAdmin = {
        fullName: 'Eric Dufresne',
        password: 'some-password',
        email: uuid4()
    };
    chai.request(server).post('/api/signup').send(newAdmin).end(function (err, res) {
        res.should.have.status(201);
        res.body.should.have.property('token');
        var token = res.body.token;
        chai.request(server).get('/api/auth/'+token).end(function (err, res) {
            res.should.have.status(200);
            res.body.should.have.property('_id');
            var id = res.body._id;
            var updateParams = {role: 'admin'};
            User.findOneAndUpdate({_id: id}, updateParams, function (err, user) {
                if (err){
                    throw err;
                }
                cb(token);
            })
        })
    });
}

