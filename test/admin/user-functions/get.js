/**
 * Created by ericdufresne on 2017-03-16.
 */
var chai = require('chai');
var should = chai.should;
var server = require('../../../server');
var uuid4 = require('uuid/v4');
var User = require('../../../api/db/schema/user').User;
var reuseEmail;

module.exports = function () {
    it('success = true. Status 200. Retrieve all users without a search string.', function (done) {
        authAdmin(function (token) {
            chai.request(server).get('/api/users').set('theaters-auth', token).end(function (err, res) {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body[0].should.have.property('email');
                reuseEmail = res.body[0].email;
                var queryParams = {
                    limit: 1,
                    offset: 1
                };
                chai.request(server).get('/api/users').set('theaters-auth', token).query(queryParams).end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.should.have.lengthOf(1);
                    res.body[0].should.have.property('email');
                    //TODO: Assert that the email is not the same because of the offset
                    done();
                });
            });
        });
    });
    it('success = true. Status 200. Should find only one user based on the search string', function (done) {
        authAdmin(function (token) {
            var queryParams = {
                search_string: reuseEmail
            };
            chai.request(server).get('/api/users').set('theaters-auth', token).query(queryParams).end(function (err, res) {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.should.have.lengthOf(1);
                res.body[0].should.have.property('email').eq(reuseEmail);
                done();
            });
        });
    });
    it('success = true. Status 403. Non admin user is not allowed to perform this operation', function (done) {
        auth(function (token) {
            chai.request(server).get('/api/users').set('theaters-auth', token).end(function (err, res) {
                res.should.have.status(403);
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
            });
        });
    });
}