/**
 * Created by ericdufresne on 2017-03-14.
 */
var chai = require('chai');
var should = chai.should;
var User = require('../../../api/db/schema/user').User;
var uuid4 = require('uuid/v4');
var server = require('../../../server');

module.exports = function () {
    it('success = true. Status 204 Should successfully delete language.', function (done) {
        authAdmin(function (token) {
            var language = {
                language: 'French'
            };
            chai.request(server).post('/api/languages').send(language).set('theaters-auth', token).end(function (err, res) {
                res.should.have.status(201);
                res.body.should.have.property('_id');
                var id = res.body._id;
                chai.request(server).delete('/api/languages/'+id).set('theaters-auth', token).end(function (err, res) {
                    res.should.have.status(204);
                    done();
                });
            });
        });
    });
    it('success = false. Status 404. Language does not exist', function (done) {
        authAdmin(function (token) {
            chai.request(server).delete('/api/languages/'+uuid4()).set('theaters-auth', token).end(function (err, res) {
                res.should.have.status(404);
                res.body.should.have.property('success').eq(false);
                done();
            });
        });
    });
    it('success = false. Status 403. Non admin user not allowed to perform this action', function (done) {
        auth(function (token) {
            chai.request(server).delete('/api/languages/'+uuid4()).set('theaters-auth', token).end(function (err, res) {
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