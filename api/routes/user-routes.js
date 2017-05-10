
var express = require('express');
var router = express.Router();
var app = express();
var passport = require('passport');
var config = require('../config').config;
var jwt = require('jwt-simple');
var User = require('../db/schema/user').User;
var handlers = require('../helpers/handlers');
var secret = config[app.settings.env].jwtSecret;

var Course= require('../db/schema/course').Course;
// var Language = require('../db/schema/language').Language;


router.get('/api/users/:id', function (req, res) {
    User.findById({_id: req.params.id}, function (err, user) {
        if (err){
            if (err.name == 'CastError'){
                handlers.handleError(res, 'No user with id: '+req.params.id, 404);
            }
            else{
                handlers.handleError(res, err);
            }
        }
        else{
            delete user.password;
            res.status(200).json(user);
        }
    });
});
router.put('/api/user', function (req, res) {
    handlers.checkAuth(req, res, function(user) {
        var updateParams = req.body;
        delete updateParams._id;
        delete updateParams.password;
        delete updateParams.role;
        user.update(updateParams, {runValidators: true}, function (err, newUser) {
           if (err){
               if (err.path == 'phoneNumbers'){
               }
               if (err.code == 11000 || err.code == 11001){
                   handlers.handleError(res, err, 409);
               }
               else{
                   handlers.handleError(res, err, 400);
               }
           }
           else{
               User.findById({_id: user.id}, function (err, user) {
                   if (err){
                       handlers.handleError(res, err);
                   }
                   else{
                       updateParams.token = jwt.encode(user, secret);
                       handlers.handleSuccess(res, updateParams, 'Updated User', 200);
                   }
               });
           }
        });
    });
});

router.get('/api/courses', function (req, res) {
    var query = Course.find({});
    console.log("HERES");
    query.exec(function (err, courses) {
        if (err){
            handlers.handleError(res, err);
        }
        else{
            handlers.handleSuccess(res, courses, 'Course query executed', 200);
        }
    });
});


module.exports = router;
