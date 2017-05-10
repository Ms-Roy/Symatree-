/**
 * Created by ericdufresne on 2017-03-07.
 */
var chai = require('chai');
var should = chai.should;
var server = require('../../server');
var uuid4 = require('uuid/v4');

module.exports = function () {
    it('success = true, returns array of companies created by user with id. Status 200', function (done) {
        auth(function (token, id) {
            createNewCompany(token, function () {
                createNewCompany(token, function () {
                    chai.request(server).get('/api/users/'+id+'/companies').end(function (err, res) {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        res.body.should.have.lengthOf(2);
                        done();
                    });
                });
            });
        });
    });
    it('success = false, returns 404. User does not exist', function (done) {
        chai.request(server).get('/api/users/'+uuid4()+'/companies').end(function (err, res) {
            res.should.have.status(404);
            res.body.should.have.property('success').eq(false);
            done();
        });
    });
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
        chai.request(server).get('/api/auth/'+token).end(function (err, res) {
            res.should.have.status(200);
            res.body.should.have.property('_id');
            cb(token, res.body._id);
        });
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
    chai.request(server).post('/api/companies').send(newCompany).set('theaters-auth', token).end(function (err, res) {
        res.should.have.status(201);
        cb();
    });
}