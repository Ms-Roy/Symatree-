/**
 * Created by ericdufresne on 2017-03-14.
 */
var chai = require('chai');
var should = chai.should;
var server = require('../../../server');
var uuid4 = require('uuid/v4');
var User = require('../../../api/db/schema/user').User;
var reuseId;
var reuseLangauge;

module.exports = function () {
    it('success = true. Status 200 successfully updated language. Ignores _id', function (done) {
        authAdmin(function (token) {
            var language = {
                language: uuid4()
            };
            chai.request(server).post('/api/languages').send(language).set('theaters-auth', token).end(function (err, res) {
                res.should.have.status(201);
                res.body.should.have.property('_id');
                reuseId = res.body._id;
                var updateParams = {
                    language: uuid4(),
                    _id: 'henlo'
                };
                chai.request(server).put('/api/languages/'+reuseId).send(updateParams).set('theaters-auth', token).end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.have.property('language').eq(updateParams.language);
                    res.body.should.not.have.property('_id');
                    done();
                });
            });
        });
    });
    it('success = false. Status 409. Updated param to conflicting value', function (done) {
        authAdmin(function (token) {
            var l = {
                language: 'SomeL'
            };
            chai.request(server).post('/api/languages').send(l).set('theaters-auth', token).end(function (err, res) {
                res.should.have.status(201);
                var updateParams = {language: l.language};
                chai.request(server).put('/api/languages/'+reuseId).send(updateParams).set('theaters-auth', token).end(function (err, res) {
                    res.should.have.status(409);
                    res.body.should.have.property('success').eq(false);
                    done();
                });
            });
        });
    });
    it('success = false. Status 400. Updated params had an empty parameter', function (done) {
        authAdmin(function (token) {
            var updateParams = {language: ''};
            chai.request(server).put('/api/languages/'+reuseId).send(updateParams).set('theaters-auth', token).end(function (err, res) {
                res.should.have.status(400);
                res.body.should.have.property('success').eq(false);
                done();
            });
        });
    });
    it('success = false. Status 403 regular user is not authorized to perform this operation', function (done) {
       auth(function (token) {
           chai.request(server).put('/api/languages/'+reuseId).send({}).set('theaters-auth', token).end(function (err, res) {
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
            })
        })
    });
}