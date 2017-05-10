/**
 * Created by ericdufresne on 2017-03-07.
 */
var chai = require('chai');
var should = chai.should;
var server = require('../../server');
var uuid4 = require('uuid/v4');

module.exports = function () {
    it('success = true, status 204. Successfully delete company with id', function (done) {
        auth(function (token) {
            createNewCompany(token, function (company) {
                var id = company._id;
                chai.request(server).delete('/api/companies/'+id).set('theaters-auth', token).end(function (err, res) {
                    res.should.have.status(204);
                    done();
                });
            });
        });
    });
    it('success = false, status 404. Company with id does not exist', function (done) {
        auth(function (token) {
            chai.request(server).delete('/api/companies/'+uuid4()).set('theaters-auth',token).end(function (err, res) {
                res.should.have.status(404);
                res.body.should.have.property('success').eq(false);
                done();
            });
        });
    });
    it('success = false, status 403. User is not allowed to delete this resource', function (done) {
        auth(function (token1) {
            createNewCompany(token1, function (company) {
                auth(function (token2) {
                    var id = company._id;
                    chai.request(server).delete('/api/companies/'+id).set('theaters-auth', token2).end(function (err, res) {
                        res.should.have.status(403);
                        res.body.should.have.property('success').eq(false);
                        done();
                    });
                });
            });
        });
    })
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
function createNewCompany(token, cb){
    var newCompany = {
        name: uuid4(),
        country: 'Canada',
        contactEmail: uuid4(),
        phoneNumber: '905-920-3672',
        website: 'www.google.gov',
        address: '195 Wilson St W, Ancaster, Ontario'
    };
    chai.request(server).post('/api/companies').set('theaters-auth',token).send(newCompany).end(function (err, res) {
        res.should.have.status(201);
        res.body.should.have.property('_id');
        cb(res.body);
    });
}