/**
 * Created by ericdufresne on 2017-03-14.
 */
var chai = require('chai');
var should = chai.should;
var server = require('../../server');
var uuid4 = require('uuid/v4');
var User = require('../../api/db/schema/user').User;

module.exports = function () {
    it('success = true. Status 201. Should create a new production', function (done) {
        auth(function (token, companyId) {
            createNewProduction(function (production) {
                chai.request(server).post('/api/companies/'+companyId+'/productions').set('theaters-auth', token).send(production).end(function (err, res) {
                    res.should.have.status(201);
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
                    res.body.should.have.property('producerId');
                    res.body.should.have.property('title').eq(production.title);
                    res.body.should.have.property('authorId').eq(production.authorId.toString());
                    res.body.should.have.property('directorId').eq(production.directorId);
                    done();
                });
            });
        });
    });
    it('success = false. Status 403. Cant authenticate no token provided', function (done) {
        chai.request(server).post('/api/companies/'+uuid4()+'/productions').end(function (err, res) {
            res.should.have.status(403);
            res.body.should.have.property('success').eq(false);
            done();
        });
    });
    it('success = false. Status 400. Bad request missing a parameter', function (done) {
        auth(function (token, companyId) {
            createNewProduction(function (production) {
                delete production.country;
                chai.request(server).post('/api/companies/'+companyId+'/productions').set('theaters-auth', token).send(production).end(function (err, res) {
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
        var company = createNewCompany();
        chai.request(server).post('/api/companies').send(company).set('theaters-auth', token).end(function (err, res) {
            res.should.have.status(201);
            res.body.should.have.property('_id');
            cb(token, res.body._id);
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
function createNewProduction(cb) {
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
        cb(production);
    });

}