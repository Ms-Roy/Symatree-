/**
 * Created by ericdufresne on 2017-02-07.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var config = require('../config').config;
var jwt = require('jwt-simple');
var User = require('../db/schema/user').User;
var app = express();
var handlers = require('../helpers/handlers');

var secret = config[app.settings.env].jwtSecret;

//Routes

router.post("/api/signup", function (req, res) {
    User.findOne({
        email: req.body.email
    }, function (err, user) {
        if (err) throw err;
        if (user){
            return res.status(409).send({success: false, msg: 'This User Already Exists'});
        }
        else{
            var newUser = new User({
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: req.body.password,
                role: req.body.role
            });
            newUser.save(function (error) {
                if (error){
                    handlers.handleError(res, error, 400);
                }
                else{
                    authenticate(req, res, true);
                }
            });
        }
    });
});

router.post("/api/login", function (req, res) {
    authenticate(req, res, false);
});

router.get("/api/auth/:token", function (req, res) {
    var token = req.params.token;
    try{
        var decodedToken = jwt.decode(token, secret);
        var id = decodedToken._id;
        User.findOne({_id: id}, function (err, user) {
            if(err){
                handlers.handleError(res, err);
            }
            else if (user){
                delete user.password;
                handlers.handleSuccess(res, user);
            }
            else{
                handlers.handleError(res, 'User doesnt exist', 403);
            }
        });
    }
    catch(err){
        handlers.handleError(res, 'Invalid Token', 403);
    }
});

function authenticate(req, res, created){
    User.findOne({
        email: req.body.email
    }, function (err, user) {
        if (err) throw err;
        if (!user){
            res.status(403).send({success: false, msg: 'Authentication Failed. No User Found.'});
        }
        else{
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err){
                    var token = jwt.encode(user, secret);

                    if (created){
                        handlers.handleSuccess(res, {token: token}, 'Signed up user', 201);
                    }
                    else{
                        handlers.handleSuccess(res, {token: token}, 'Authenticated existing user');
                    }
                }
                else{
                    res.status(403).send({success: false, msg: 'Authentication Failed. Password Doesnt Match'});
                }
            });
        }
    });
}
module.exports = router;
