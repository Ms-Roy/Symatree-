/**
 * Created by ericdufresne on 2017-03-14.
 */
var chai = require('chai');
var should = chai.should;
var server = require('../../server');
var uuid4 = require('uuid/v4');
var User = require('../../api/db/schema/user').User;
var reuseId;

module.exports = function () {

    it('success = true. Status 200. Successfully updated production', function (done) {
        auth(function (token) {
            createNewProduction(token, function (production) {
                var updateParams = {'country': 'Some Other Country'};
                chai.request(server).put('/api/productions/'+production._id).set('theaters-auth', token).send(updateParams).end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.have.property('country').eq(updateParams.country);
                    reuseId = production._id;
                    done();
                });
            });
        });
    });
    it('success = false. Status 403. Cannot update that production. Not owned by you', function (done) {
        auth(function (token) {
            chai.request(server).put('/api/productions/'+reuseId).send({}).set('theaters-auth', token).end(function (err, res) {
                res.should.have.status(403);
                res.body.should.have.property('success').eq(false);
                done();
            });
        });
    });

    it('success = false. Status 403. No token provided cant auth', function (done) {
        chai.request(server).put('/api/productions/'+uuid4()).send({}).end(function (err, res) {
            res.should.have.status(403);
            res.body.should.have.property('success').eq(false);
            done();
        });
    });
    it('success = false. Status 404. Production doesnt exist', function (done) {
        auth(function (token) {
            chai.request(server).put('/api/productions/'+uuid4()).set('theaters-auth', token).send({}).end(function (err, res) {
                res.should.have.status(404);
                res.body.should.have.property('success').eq(false);
                done();
            });
        });
    });
    it('success = false. Status 400. Bad request. Set required parameter to empty', function (done) {
        auth(function (token) {
            createNewProduction(token, function (production) {
                var updateParams = {country: ''};
                chai.request(server).put('/api/productions/'+production._id).send(updateParams).set('theaters-auth', token).end(function (err, res) {
                    res.should.have.status(400);
                    res.body.should.have.property('success').eq(false);
                    done();
                });
            });
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
        cb(token);
    });
}
function createNewProduction(token, cb) {
    User.findOne({}, function (err, user) {
        if (err){
            throw err;
        }
        var production = {
            genre: 'Genre',
            audience: 'Audience',
            country: 'Canada',
            description: 'Hello',
            language: 'English',
            title: 'Some Title',
            authorId: user._id,
            rating: '3.1',
            directorId: 'Some Director',
            posterURL: 'some-url',
            productionYear: 1900,
            duration: '3hrs, 4min'
        };
        var company = createNewCompany();
        chai.request(server).post('/api/companies').set('theaters-auth', token).send(company).end(function (err, res) {
            res.should.have.status(201);
            res.body.should.have.property('_id');
            var id = res.body._id;
            chai.request(server).post('/api/companies/'+id+'/productions').send(production).set('theaters-auth', token).end(function (err, res) {
                res.should.have.status(201);
                res.body.should.have.property('_id');
                cb(res.body);
            });
        });
    });
}
function createNewCompany(){
    return {
        name: uuid4(),
        country: 'Canada',
        contactEmail: uuid4(),
        phoneNumber: '905-920-3672',
        website: 'www.google.gov',
        address: '195 Wilson St W, Ancaster, Ontario'
    };
}