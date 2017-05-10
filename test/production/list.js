/**
 * Created by ericdufresne on 2017-03-14.
 */
var chai = require('chai');
var should = chai.should;
var server = require('../../server');
var uuid4 = require('uuid/v4');

module.exports = function () {
    it('success = true. Status 200. Should search through all productions', function (done) {
        chai.request(server).get('/api/productions').end(function (err, res) {
            res.should.have.status(200);
            res.body.should.be.a('array');
            console.log(res.body);
            done();
        });
    });

};