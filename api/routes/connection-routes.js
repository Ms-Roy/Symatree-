/**
 * Created by ericdufresne on 2017-02-07.
 */
/**
 * Created by ericdufresne on 2017-02-07.
 */
var express = require('express');
var router = express.Router();
var passport = require('passport');
var config = require('../config').config;
var jwt = require('jwt-simple');


router.get('/', function (req, res) {
    res.redirect('/api');
});
router.get('/api', function (req, res) {
    res.status(200).json({'Message': 'Welcome to the Symatree API.'});
});

module.exports = router;
