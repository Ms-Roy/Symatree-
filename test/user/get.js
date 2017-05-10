/**
 * Created by ericdufresne on 2017-03-07.
 */
var chai = require('chai');
var should = chai.should;
var server = require('../../server');
var uuid4 = require('uuid/v4');


module.exports =  function () {
    it('Should return all user data for the user except password for the given id. status 200', function (done) {
        var newUser = {
            email: uuid4()+"@hotmail.com",
            password: 'some-password',
            fullName: 'Eric Dufresne'
        };
        chai.request(server).post('/api/signup').send(newUser).end(function (err, res) {
            res.should.have.status(201);
            res.body.should.have.property('token');
            var token = res.body.token;
            chai.request(server).get('/api/auth/'+token).end(function (err, res) {
                res.should.have.status(200);
                res.body.should.have.property('_id');
                var id = res.body._id;
                chai.request(server).get('/api/users/'+id).end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('email').eq(newUser.email);
                    res.body.should.have.property('fullName').eq(newUser.fullName);
                    res.body.phoneNumbers.should.be.a('array');
                    res.body.phoneNumbers.should.have.lengthOf(0);
                    res.body.should.have.property('_id').eq(id);
                    done();
                });
            });
        });
    });
    it('Should return success = false, 404 user does not exist with bad id sent', function (done) {
        chai.request(server).get('/api/users/'+uuid4()).end(function (err, res) {
            res.should.have.status(404);
            res.body.should.have.property('success').eq(false);
            res.body.should.be.a('object');
            done();
        });
    });
};