/**
 * Created by ericdufresne on 2017-03-16.
 */
var chai = require('chai');
var should = chai.should;
var server = require('../../../server');
var uuid4 = require('uuid/v4');
var User = require('../../../api/db/schema/user').User;

module.exports = function () {
    it('success = true. Status 204. Should successfully delete a audience from the list.', function (done) {
        authAdmin(function (token) {
            var newAudience = {
                audience: 'Teens'
            };
            chai.request(server).post('/api/audiences').set('theaters-auth', token).send(newAudience).end(function (err, res) {
                res.should.have.status(201);
                res.body.should.have.property('_id');
                var id = res.body._id;
                chai.request(server).delete('/api/audiences/'+id).set('theaters-auth', token).end(function (err, res) {
                    res.should.have.status(204);
                    done();
                });
            });
        });
    });
    it('success = false. Status 404. Audience does not exist', function (done) {
        authAdmin(function (token) {
            chai.request(server).delete('/api/audiences/'+uuid4()).set('theaters-auth', token).end(function (err, res) {
                res.should.have.status(404);
                res.body.should.have.property('success').eq(false);
                done();
            });
        });
    });
    it('success = false. Status 403. Audience does not exist', function (done) {
        auth(function (token) {
            chai.request(server).delete('/api/audiences/'+uuid4()).set('theaters-auth', token).end(function (err, res) {
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