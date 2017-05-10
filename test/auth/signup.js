/**
 * Created by ericdufresne on 2017-03-07.
 */
var chai = require('chai');
var should = chai.should;
var server = require('../../server');

module.exports = function () {
    it('Should return success = true and a user token. status 201', function (done) {
        var newUser = {
            fullName: 'Eric Dufresne',
            password: 'some-generic-password',
            email: 'some-unique-email@hotmail.com'
        };
        chai.request(server).post('/api/signup').send(newUser).end(function (err, res) {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('token');
            res.body.should.have.property('success').eq(true);
            done();
        });
    });
};