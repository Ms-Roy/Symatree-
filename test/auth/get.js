/**
 * Created by ericdufresne on 2017-03-07.
 */
var chai = require('chai');
var should = chai.should;
var server = require('../../server');

module.exports = function () {
    it('Should return all user data for the user with the given token. status 200', function (done) {
        var existingUser = {
            email: 'some-unique-email@hotmail.com',
            password: 'some-generic-password'
        };
        chai.request(server).post('/api/login').send(existingUser).end(function (err, res) {
            var token = res.body.token;
            chai.request(server).get('/api/auth/'+token).end(function (err, res) {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
        });
    });
};