/**
 * Created by ericdufresne on 2017-03-14.
 */
var chai = require('chai');
var should = chai.should;
var server = require('../../server');
var uuid4 = require('uuid/v4');
var User = require('../../api/db/schema/user').User;

module.exports = function () {
    it('success = true. Status 200. Gets all productions for the given company', function (done) {
        auth(function (token) {
            createNewProduction(token, function (production) {
                var companyId = production.producerId;
                chai.request(server).get('/api/companies/'+companyId+'/productions').end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.should.have.lengthOf(1);
                    done();
                });
            });
        });
    });
    it('success = false. Status 404. Company doesnt exist', function (done) {
        chai.request(server).get('/api/companies/'+uuid4()+'/productions').end(function (err, res) {
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
                res.body.should.have.property('producerId');
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