/**
 * Created by ericdufresne on 2017-03-07.
 */
var chai = require('chai');
var should = chai.should;
var server = require('../../server');

module.exports = function () {
    it('A welcome message is returned as well as success = true. status 200', function (done) {
        chai.request(server).get('/api').end(function (err, res) {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        });
    });
};