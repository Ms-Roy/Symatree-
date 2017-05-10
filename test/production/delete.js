/**
 * Created by ericdufresne on 2017-03-14.
 */
var chai = require('chai');
var should = chai.should;
var server = require('../../server');
var uuid4 = require('uuid/v4');
var User = require('../../api/db/schema/user').User;

module.exports = function () {
    it('success = true. Status 204. Successfully delete user', function (done) {
        auth(function (token) {
            createNewProduction(token, function (production) {
                chai.request(server).delete('/api/productions/'+production._id).set('theaters-auth', token).end(function (err, res) {
                    res.should.have.status(204);
                    done();
                });
            });
        });
    });
    it('success = false. Status 403. Cant delete production. Not owned by you', function (done) {
        auth(function (token) {
            auth(function (token2) {
                createNewProduction(token, function (production) {
                    chai.request(server).delete('/api/productions/'+production._id).set('theaters-auth', token2).end(function (err, res) {
                        res.should.have.status(403);
                        res.body.should.have.property('success').eq(false);
                        done();
                    });
                });
            });

        });
    });
    it('success = false. Status 403. Cant auth. No token provided', function (done) {
        chai.request(server).delete('/api/productions/'+uuid4()).end(function (err, res) {
            res.should.have.status(403);
            res.body.should.have.property('success').eq(false);
            done();
        });
    });
    it('success = false. Status 404. Product does not exist', function (done) {
        auth(function (token) {
            chai.request(server).delete('/api/productions/'+uuid4()).set('theaters-auth', token).end(function (err, res) {
                res.should.have.status(404);
                res.body.should.have.property('success').eq(false);
                done();
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
function createNewProduction(token, cb) {
    User.findOne({}, function (err, user) {
        if (err){
            throw err;
        }
        var company = createNewCompany();
        chai.request(server).post('/api/companies').send(company).set('theaters-auth', token).end(function (err, res) {
            res.should.have.status(201);
            res.body.should.have.property('_id');
            var id = res.body._id;
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
            chai.request(server).post('/api/companies/'+id+'/productions').send(production).set('theaters-auth', token).end(function (err, res) {
                res.should.have.status(201);
                res.body.should.have.property('_id');
                cb(res.body);
            });
        });
    });
}