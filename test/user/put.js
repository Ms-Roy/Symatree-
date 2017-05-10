/**
 * Created by ericdufresne on 2017-03-12.
 */
var chai = require('chai');
var should = chai.should;
var express = require('express');
var app = express();
var server = require('../../server');
var uuid4 = require('uuid/v4');
var reuseEmail;
var reuseToken;
var User = require('../../api/db/schema/user').User;
var config = require('../../api/config').config;
var secret = config[app.settings.env].jwtSecret;
var jwt = require('jwt-simple');

module.exports = function () {
    it('success = true. Status 200 should update the user with the given items', function (done) {
        auth(function (token) {
            var body = jwt.decode(token, secret);
            var id = body._id;
            var updateParams = {
                website: 'www.something.com',
                email: 'e-dufresne@hotmail.com',
                programOfStudy: 'Software Eng',
                school: 'UOttawa',
                fullName: 'Cire Enserfud',
                _id: 'something'
            };
            reuseEmail = updateParams.email;
            chai.request(server).put('/api/user').send(updateParams).set('theaters-auth', token).end(function (err, res) {
                res.should.have.status(200);
                res.body.should.not.have.property('_id');
                res.body.should.have.property('website').eq(updateParams.website);
                res.body.should.have.property('email').eq(updateParams.email);
                res.body.should.have.property('programOfStudy').eq(updateParams.programOfStudy);
                res.body.should.have.property('school').eq(updateParams.school);
                res.body.should.have.property('token');
                res.body.token.should.not.be.eq(token);

                User.findById({_id: id}, function (err, user) {
                    if (err){
                        throw err;
                    }
                    user.should.have.property('website').eq(updateParams.website);
                    user.should.have.property('email').eq(updateParams.email);
                    user.should.have.property('programOfStudy').eq(updateParams.programOfStudy);
                    user.should.have.property('school').eq(updateParams.school);
                    user.should.have.property('fullName').eq(updateParams.fullName);
                    done();
                });
            });
        })
    });
    it('success = true. Status 200. Update phone number of user', function (done) {
        auth(function (token) {
            var updateParams = {
                phoneNumbers: [
                    {
                        numberType: 'Mobile',
                        number: '905-920-3672'
                    },
                    {
                        numberType: 'Fax',
                        number: '905-920-3671'
                    }
                ]
            };
            chai.request(server).put('/api/user').send(updateParams).set('theaters-auth', token).end(function (err, res) {
                res.should.have.status(200);
                res.body.should.have.property('token');
                reuseToken = res.body.token;
                done();
            });
        });
    });
    it('success = true. Status 200. Getting last updated user.', function (done) {
        chai.request(server).get('/api/auth/'+reuseToken).end(function (err, res) {
            res.should.have.status(200);
            res.body.should.have.property('phoneNumbers');
            res.body.should.have.property('_id');
            res.body.should.have.property('fullName');
            res.body.should.have.property('email');
            res.body.phoneNumbers.should.be.a('array');
            res.body.phoneNumbers.should.have.lengthOf(2);
            done();
        })
    });
    it('success = false. Status 400. Passed bad parameters', function (done) {
        auth(function (token) {
            var badParams = {fullName: ''};
            chai.request(server).put('/api/user').send(badParams).set('theaters-auth', token).end(function (err, res) {
                res.should.have.status(400);
                res.body.should.have.property('success').eq(false);
                done();
            });
        });
    });
    it('success = false. Status 409. Conflicting email', function (done) {
        auth(function (token) {
            var data = {email: reuseEmail};
            chai.request(server).put('/api/user').send(data).set('theaters-auth', token).end(function (err, res) {
                res.should.have.status(409);
                res.body.should.have.property('success').eq(false);
                done();
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
