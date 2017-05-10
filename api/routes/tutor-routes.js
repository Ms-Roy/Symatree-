var express = require('express');
var router = express.Router();
var passport = require('passport');
var config = require('../config').config;
var jwt = require('jwt-simple');
var CourseTeach = require('../db/schema/courseTeach').CouseTeach;
var User = require('../db/schema/user').User;
var mongoose = require('mongoose');
var handlers = require('../helpers/handlers');

router.post('/api/courseTeach', function (req, res) {
    handlers.checkAuth(req, res, function (user) {
        var courseTeach = new CourseTeach();
        courseTeach.userId = user._id;
        courseTeach.code = req.body.code;
        courseTeach.name = req.body.name;
        courseTeach.school = req.body.school;

        courseTeach.save(function (err, newCourseTeach) {
            if (err){
                if (err.code == 11000 || err.code == 11001){
                    handlers.handleError(res, err, 409);
                }
                else{
                    handlers.handleError(res, err, 400);
                }
            }
            else{
                handlers.handleSuccess(res, newCourseTeach, 'Added new course', 201);
            }
        });
    });
});

router.get('/api/courseTeach/:id', function (req, res) {
    CourseTeach.findById({_id: req.params.id}, function (err, courseTeach) {
        if (err){
            if (err.name == 'CastError'){
                handlers.handleSuccess(res, null);
            }
            else{
                handlers.handleError(res, err);
            }
        }
        else if (courseTeach){
            handlers.handleSuccess(res, courseTeach, 'courseTeach with id: '+req.params.id+' found');
        }
        else{
            handlers.handleSuccess(res, null);
        }
    });
});
router.put('/api/courseTeach/:id', function (req, res) {
    handlers.checkAuth(req, res, function (user) {
        CourseTeach.findById({_id: req.params.id}, function (err, courseTeach) {
            if (err){
                if (err.name == 'CastError'){
                    handlers.handleError(res, 'courseTeach does not exist.', 404);
                }
                else{
                    handlers.handleError(res, err);
                }
            }
            else if (courseTeach){
                var uid1 = user._id.toString();
                var uid2 = courseTeach.userId.toString();
                if (uid1 != uid2){
                    handlers.handleError(res, 'Access denied when modifying courseTeach', 403);
                    return;
                }
                var courseTeachUpdate = req.body;
                delete courseTeachUpdate._id;
                delete courseTeachUpdate.userId;
                courseTeach.update(courseTeachUpdate, {runValidators: true}, function (err) {
                    if (err){
                        if (err.code == 11000 || err.code == 11001){
                            handlers.handleError(res, err, 409);
                        }
                        else{
                            handlers.handleError(res, err, 400);
                        }
                    }
                    else{
                        handlers.handleSuccess(res, courseTeachUpdate, 'Updated courseTeach', 200);
                    }
                })
            }
            else{
                handlers.handleError(res, 'courseTeach does not exist', 404);
            }
        });
    })

});

router.get('/api/users/:id/courseTeach', function (req, res) {
   User.findById({_id: req.params.id}, function (err, user) {
       if (err){
           if (err.name == 'CastError'){
               handlers.handleError(res, 'User not found', 404);
           }
           else{
               handlers.handleError(res, err);
           }
       }
       else if (user){
           var query = CourseTeach.find({userId: req.params.id});
           query.exec(function (err, courseTeach) {
               if (err){
                   handlers.handleError(res, err);
               }
               else{
                   handlers.handleSuccess(res, courseTeach, 'Query for courseTeach created by user: '+req.params.id+' completed');
               }
           });
       }
       else{
           handlers.handleError(res, 'User not found', 404);
       }
   })
});
router.delete('/api/courseTeach/:id', function (req, res) {
    handlers.checkAuth(req, res, function (user) {
        CourseTeach.findById({_id: req.params.id}, function (err, courseTeach) {
            if (err){
                if (err.name == 'CastError'){
                    handlers.handleError(res, 'courseTeach doesnt exist', 404);
                }
                else{
                    handlers.handleError(res, err);
                }
            }
            else if (courseTeach){
                var uid1 = courseTeach.userId.toString();
                var uid2 = user._id.toString();
                if (uid1 != uid2){
                    handlers.handleError(res, 'Access denied when deleting courseTeach', 403);
                    return;
                }
                courseTeach.remove(function (err) {
                    if (err){
                        handlers.handleError(res, err);
                    }
                    else{
                        handlers.handleNoContent(res);
                    }
                });
            }
            else{
                handlers.handleError(res, err);
            }
        });
    });
});

module.exports = router;
