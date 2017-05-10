/**
 * Created by ericdufresne on 2017-03-15.
 */
var chai = require('chai');
var should = chai.should;
var server = require('../../../server');
var uuid4 = require('uuid/v4');
var User = require('../../../api/db/schema/user').User;

module.exports = function () {
    it('success = true. Status 200 Should return all countries. ', function (done) {
        chai.request(server).get('/api/countries').end(function (err, res) {
            res.should.have.status(200);
            res.body.should.be.a('array');
            done();
        });
    });
};