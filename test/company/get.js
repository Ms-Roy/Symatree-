/**
 * Created by ericdufresne on 2017-03-07.
 */
var chai = require('chai');
var should = chai.should;
var server = require('../../server');
var uuid4 = require('uuid/v4');

module.exports = function () {
    it('success = true, Should return the previously created company. Status 200', function (done) {
        auth(function (token) {
            var newCompany = createNewCompany();
            chai.request(server).post('/api/companies').send(newCompany).set('theaters-auth', token).end(function (err, res) {
                res.should.have.status(201);
                res.body.should.have.property('_id');
                var companyId = res.body._id;
                reuseId = companyId;
                chai.request(server).get('/api/companies/'+companyId).end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.have.property('name').eq(newCompany.name);
                    res.body.should.have.property('_id').eq(companyId);
                    res.body.should.have.property('country').eq(newCompany.country);
                    res.body.should.have.property('contactEmail').eq(newCompany.contactEmail);
                    res.body.should.have.property('phoneNumber').eq(newCompany.phoneNumber);
                    res.body.should.have.property('website').eq(newCompany.website);
                    res.body.should.have.property('address').eq(newCompany.address);
                    done();
                });
            });
        });
    });
    it('success = false, returns null body with 404 status. Company doesnt exist', function (done) {
        chai.request(server).get('/api/companies/'+uuid4()).end(function (err, res) {
            res.should.have.status(404);
            res.should.have.property('body').eq(null);
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