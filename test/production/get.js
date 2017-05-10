/**
 * Created by ericdufresne on 2017-03-14.
 */
var chai = require('chai');
var should = chai.should;
var server = require('../../server');
var uuid4 = require('uuid/v4');
var User = require('../../api/db/schema/user').User;
var id;
module.exports = function () {
    it('success = true. Status 200. Should get details of production', function (done) {
        auth(function (token) {
            createNewProduction(token, function (production) {
                chai.request(server).get('/api/productions/'+production._id).end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.have.property('userId');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('genre').eq(production.genre);
                    res.body.should.have.property('audience').eq(production.audience);
                    res.body.should.have.property('country').eq(production.country);
                    res.body.should.have.property('language').eq(production.language);
                    res.body.should.have.property('dateAdded');
                    res.body.should.have.property('productionYear').eq(production.productionYear);
                    res.body.should.have.property('posterURL').eq(production.posterURL);
                    res.body.should.have.property('duration').eq(production.duration);
                    res.body.should.have.property('rating').eq(production.rating);
                    res.body.should.have.property('title').eq(production.title);
                    res.body.should.have.property('authorId').eq(production.authorId.toString());
                    res.body.should.have.property('producerId').eq(production.producerId);
                    res.body.should.have.property('directorId').eq(production.directorId);
                    id = res.body.userId;
                    done();
                });
            });
        });
    });
    it('success = false. Status 404. Production does not exist', function (done) {
        chai.request(server).get('/api/productions/'+id).end(function (err, res) {
            res.should.have.status(404);
            res.body.should.have.property('success').eq(false);
            done();
        });
    });
    it('success = false. Status 404. Production id invalid, does not exist.', function (done) {
        chai.request(server).get('/api/productions/'+uuid4()).end(function (err, res) {
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
        chai.request(server).post('/api/companies').set('theaters-auth', token).send(company).end(function (err, res) {
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
            chai.request(server).post('/api/companies/'+id+'/productions').set('theaters-auth', token).send(production).end(function (err, res) {
                res.should.have.status(201);
                res.body.should.have.property('_id');
                cb(res.body);
            });
        });
    });
}