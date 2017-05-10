/**
 * Created by ericdufresne on 2017-02-07.
 */
process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var User = require('../api/db/schema/user').User;
var Company = require('../api/db/schema/company').Company;
var Production = require('../api/db/schema/production').Production;
var Language = require('../api/db/schema/language').Language;
var Country = require('../api/db/schema/country').Country;
var Genre = require('../api/db/schema/genre').Genre;
var Audience = require('../api/db/schema/audience').Audience;

var server = require('../server');
var should = chai.should();
chai.use(chaiHttp);

var reuseId;

describe('Server Tests', function () {
    this.timeout(5000);
    describe('Connection Test', function () {
        describe('GET /api', require('./connection-test/get'));
    });

    describe('Authentication', function () {
        User.collection.drop();
        describe('POST /api/signup', require('./auth/signup'));
        describe('POST /api/login', require('./auth/login'));
        describe('GET /api/auth/:token', require('./auth/get'));
    });

    describe('User Endpoints', function () {
        describe('GET /api/users/:id', require('./user/get'));
        describe('PUT /api/user', require('./user/put'));
    });
    describe('Admin Endpoints', function () {
        Language.collection.drop();
        Country.collection.drop();
        Genre.collection.drop();
        Audience.collection.drop();
        describe('Language Endpoints', function () {
            describe('POST /api/languages', require('./admin/languages/post'));
            describe('GET /api/languages', require('./admin/languages/get'));
            describe('DELETE /api/languages/:id', require('./admin/languages/delete'));
            describe('PUT /api/languages/:id', require('./admin/languages/put'));
        });
        describe('Country Endpoints', function () {
            describe('POST /api/countries', require('./admin/countries/post'));
            describe('GET /api/countries', require('./admin/countries/get'));
            describe('DELETE /api/countries/:id', require('./admin/countries/delete'));
        });
        describe('Genre Endpoints', function () {
            describe('POST /api/genres', require('./admin/genres/post'));
            describe('GET /api/genres', require('./admin/genres/get'));
            describe('DELETE /api/genres/:id', require('./admin/genres/delete'));
        });
        describe('Audience Endpoints', function () {
            describe('POST /api/audiences', require('./admin/audiences/post'));
            describe('GET /api/audiences', require('./admin/audiences/get'));
            describe('DELETE /api/audiences/:id', require('./admin/audiences/delete'));
        });
        describe('User-role Endpoints', function () {
            describe('GET /api/users', require('./admin/user-functions/get'));
            describe('PUT /api/users/:id/role', require('./admin/user-functions/put'));
        });
    });
    describe('Production Endpoints', function () {
        Production.collection.drop();
        describe('POST /api/companies/:id/productions', require('./production/post'));
        describe('GET /api/productions', require('./production/list'));
        describe('GET /api/productions/:id', require('./production/get'));
        describe('GET /api/companies/:id/productions', require('./production/companies-list'));
        describe('PUT /api/productions/:id', require('./production/put'));
        describe('DELETE /api/productions/:id', require('./production/delete'));
    });
    describe('Company Endpoints', function () {
        Company.collection.drop();
        describe('POST /api/companies', require('./company/post'));
        describe('GET /api/companies/:id', require('./company/get'));
        describe('GET /api/users/:id/companies', require('./company/list-users'));
        describe('PUT /api/companies/:id', require('./company/put'));
        describe('DELETE /api/companies/:id', require('./company/delete'));
    });
});