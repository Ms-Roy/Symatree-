var express = require('express');
var router = express.Router();
var passport = require('passport');
var config = require('../config').config;
var jwt = require('jwt-simple');
var Teach = require('../db/schema/teach').Teach;
var User = require('../db/schema/user').User;
var mongoose = require('mongoose');
var handlers = require('../helpers/handlers');

router.post('/api/teaches', function (req, res) {
    handlers.checkAuth(req, res, function (user) {
        var teach = new Teach();
        teach.userId = user._id;
        teach.code = req.body.code;
        teach.isTeaching = req.body.isTeaching;
        teach.price = req.body.price;
        teach.code = req.body.code;
        teach.form = teach.startDate;

        teach.save(function (err, newTeach) {
            if (err){
                if (err.code == 11000 || err.code == 11001){
                    handlers.handleError(res, err, 409);
                }
                else{
                    handlers.handleError(res, err, 400);
                }
            }
            else{
                handlers.handleSuccess(res, newTeach, 'Created new teach', 201);
            }
        });
    });
});
/* returns all courses in the system */
/* returns all productions in the system */
router.get('/api/teaches', function (req, res) {

    //Any search parameters can go in here
    var searchParams = {

    };
    var query = Teach.find(searchParams);
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

    query.exec(function (err, teaches) {
        if (err){
            handlers.handleError(res, err);
        }
        else{
            handlers.handleSuccess(res, teaches, 'Teaches query executed', 200);
        }
    });
});

router.get('/api/teaches/:id', function (req, res) {
    Teach.findById({_id: req.params.id}, function (err, teach) {
        if (err){
            if (err.name == 'CastError'){
                handlers.handleSuccess(res, null);
            }
            else{
                handlers.handleError(res, err);
            }
        }
        else if (teach){
            handlers.handleSuccess(res, teach, 'Teach with id: '+req.params.id+' found');
        }
        else{
            handlers.handleSuccess(res, null);
        }
    });
});
router.put('/api/teaches/:id', function (req, res) {
    handlers.checkAuth(req, res, function (user) {
        Teach.findById({_id: req.params.id}, function (err, teach) {
            if (err){
                if (err.name == 'CastError'){
                    handlers.handleError(res, 'Teach does not exist.', 404);
                }
                else{
                    handlers.handleError(res, err);
                }
            }
            else if (teach){
                var uid1 = user._id.toString();
                var uid2 = teach.userId.toString();
                if (uid1 != uid2){
                    handlers.handleError(res, 'Access denied when modifying Teach', 403);
                    return;
                }
                var teachUpdate = req.body;
                delete teachUpdate._id;
                delete teachUpdate.userId;
                teach.update(teachUpdate, {runValidators: true}, function (err) {
                    if (err){
                        if (err.code == 11000 || err.code == 11001){
                            handlers.handleError(res, err, 409);
                        }
                        else{
                            handlers.handleError(res, err, 400);
                        }
                    }
                    else{
                        handlers.handleSuccess(res, teachUpdate, 'Updated teach', 200);
                    }
                })
            }
            else{
                handlers.handleError(res, 'Teach does not exist', 404);
            }
        });
    })

});

router.get('/api/users/:id/teaches', function (req, res) {
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
           var query = Teach.find({userId: req.params.id});
           query.exec(function (err, teaches) {
               if (err){
                   handlers.handleError(res, err);
               }
               else{
                   handlers.handleSuccess(res, teaches, 'Query for teaches created by user: '+req.params.id+' completed');
               }
           });
       }
       else{
           handlers.handleError(res, 'User not found', 404);
       }
   })
});
router.delete('/api/teaches/:id', function (req, res) {
    handlers.checkAuth(req, res, function (user) {
        Teach.findById({_id: req.params.id}, function (err, teach) {
            if (err){
                if (err.name == 'CastError'){
                    handlers.handleError(res, 'Teach doesnt exist', 404);
                }
                else{
                    handlers.handleError(res, err);
                }
            }
            else if (teach){
                var uid1 = teach.userId.toString();
                var uid2 = user._id.toString();
                if (uid1 != uid2){
                    handlers.handleError(res, 'Access denied when deleting teach', 403);
                    return;
                }
                teach.remove(function (err) {
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
