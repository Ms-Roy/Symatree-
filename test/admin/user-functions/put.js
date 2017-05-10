/**
 * Created by ericdufresne on 2017-03-16.
 */
var chai = require('chai');
var should = chai.should;
var server = require('../../../server');
var uuid4 = require('uuid/v4');
var User = require('../../../api/db/schema/user').User;
var reuseEmail;

module.exports = function () {
    it('success = true. Status 200. Should bump user up to admin role', function (done) {
        authAdmin(function (token) {
            getUserId(function (id) {
                var updateParams = {role: 'admin'};
                chai.request(server).put('/api/users/'+id+'/role').set('theaters-auth', token).send(updateParams).end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.have.property('role').eq(updateParams.role);
                    done();
                });
            });
        });
    })
};

function getUserId(cb){
    var query = User.find({});
    query.limit(1);
    query.exec(function (err, users) {
        if (err){
            throw err;
        }
        cb(users[0]._id);
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
            });
        });
    });
}