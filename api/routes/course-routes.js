var express = require('express');
var router = express.Router();
var passport = require('passport');
var config = require('../config').config;
var jwt = require('jwt-simple');
var Course = require('../db/schema/course').Course;
var User = require('../db/schema/user').User;
var mongoose = require('mongoose');
var handlers = require('../helpers/handlers');

router.post('/api/courses', function (req, res) {
    handlers.checkAuth(req, res, function (user) {
        var course = new Course();
        course.userId = user._id;
        course.code = req.body.code;
        course.name = req.body.name;
        course.school = req.body.school;
        course.professor = req.body.professor;
        course.semester = req.body.semester;
        course.year = req.body.year;
        course.description = req.body.description;
        course.save(function (err, newCourse) {
            if (err){
                if (err.code == 11000 || err.code == 11001){
                    handlers.handleError(res, err, 409);
                }
                else{
                    handlers.handleError(res, err, 400);
                }
            }
            else{
                handlers.handleSuccess(res, newCourse, 'Created new course', 201);
            }
        });
    });
});
/* returns all courses in the system */
/* returns all productions in the system */
router.get('/api/courses', function (req, res) {

    //Any search parameters can go in here
    var searchParams = {

    };
    var query = Course.find(searchParams);
    if (req.query.limit){
        query.limit(parseInt(req.query.limit));
    }
    if (req.query.offset){
        query.skip(parseInt(req.query.offset));
    }
    if (req.query.sortBy){
        var sortParams = {};
        sortParams[req.query.sortBy] = -1;
        query.sort(sortParams);
    }

    query.exec(function (err, courses) {
        if (err){
            handlers.handleError(res, err);
        }
        else{
            handlers.handleSuccess(res, courses, 'Courses query executed', 200);
        }
    });
});

router.get('/api/courses/:id', function (req, res) {
    Course.findById({_id: req.params.id}, function (err, course) {
        if (err){
            if (err.name == 'CastError'){
                handlers.handleSuccess(res, null);
            }
            else{
                handlers.handleError(res, err);
            }
        }
        else if (course){
            handlers.handleSuccess(res, course, 'Course with id: '+req.params.id+' found');
        }
        else{
            handlers.handleSuccess(res, null);
        }
    });
});
router.put('/api/courses/:id', function (req, res) {
    handlers.checkAuth(req, res, function (user) {
        Course.findById({_id: req.params.id}, function (err, course) {
            if (err){
                if (err.name == 'CastError'){
                    handlers.handleError(res, 'Course does not exist.', 404);
                }
                else{
                    handlers.handleError(res, err);
                }
            }
            else if (course){
                var uid1 = user._id.toString();
                var uid2 = course.userId.toString();
                if (uid1 != uid2){
                    handlers.handleError(res, 'Access denied when modifying course', 403);
                    return;
                }
                var courseUpdate = req.body;
                delete courseUpdate._id;
                delete courseUpdate.userId;
                course.update(courseUpdate, {runValidators: true}, function (err) {
                    if (err){
                        if (err.code == 11000 || err.code == 11001){
                            handlers.handleError(res, err, 409);
                        }
                        else{
                            handlers.handleError(res, err, 400);
                        }
                    }
                    else{
                        handlers.handleSuccess(res, courseUpdate, 'Updated company', 200);
                    }
                })
            }
            else{
                handlers.handleError(res, 'Course does not exist', 404);
            }
        });
    })

});

router.get('/api/users/:id/courses', function (req, res) {
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
           var query = Course.find({userId: req.params.id});
           query.exec(function (err, courses) {
               if (err){
                   handlers.handleError(res, err);
               }
               else{
                   handlers.handleSuccess(res, courses, 'Query for courses created by user: '+req.params.id+' completed');
               }
           });
       }
       else{
           handlers.handleError(res, 'User not found', 404);
       }
   })
});
router.delete('/api/courses/:id', function (req, res) {
    handlers.checkAuth(req, res, function (user) {
        Course.findById({_id: req.params.id}, function (err, course) {
            if (err){
                if (err.name == 'CastError'){
                    handlers.handleError(res, 'Course doesnt exist', 404);
                }
                else{
                    handlers.handleError(res, err);
                }
            }
            else if (course){
                var uid1 = course.userId.toString();
                var uid2 = user._id.toString();
                if (uid1 != uid2){
                    handlers.handleError(res, 'Access denied when deleting course', 403);
                    return;
                }
                course.remove(function (err) {
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
