/**
 * Created by ericdufresne on 2017-03-14.
 */
var express = require('express');
var router = express.Router();
var app = express();
var config = require('../config').config;
var User = require('../db/schema/user').User;
var Course = require('../db/schema/course').Course;
var Language = require('../db/schema/language').Language;
var handlers = require('../helpers/handlers');
var secret = config[app.settings.env].jwtSecret;

//Admins can add courses only.
router.post('/api/courses', function (req, res) {
   handlers.checkAdmin(req, res, function (admin) {
       var l = new Course();
       l.code = req.body.code;
       l.name = req.body.name;
       l.professor = req.body.professor;
       l.semester = req.body.semester;
       l.school = req.body.school;
       l.year= req.body.year;
       l.save(function (err, newLanguage) {
           if (err){
               if (err.code == 11000 || err.code == 11001){
                   handlers.handleError(res, 'Course already exists', 409);
               }
               else{
                   handlers.handleError(res, err, 400);
               }
           }
           else{
               handlers.handleSuccess(res, newLanguage, 'Created Course', 201);
           }
       });
   });
});

//Only Admins can edit courses
router.put('/api/courses/:id', function (req, res) {
    handlers.checkAdmin(req, res, function (admin) {
        Course.findOne({_id: req.params.id}, function (err, language) {
            if (err){
                if (err.name == 'CastError'){
                    handlers.handleError(res, 'Cannot find course with id', 404);
                }
                else{
                    handlers.handleError(res, err);
                }
            }
            else if (course){
                var updateParams = req.body;
                delete updateParams._id;
                course.update(req.body, {runValidators: true}, function (err) {
                    if (err){
                        if (err.code == 11000 || err.code == 11001){
                            handlers.handleError(res, err, 409);
                        }
                        else{
                            handlers.handleError(res, err, 400);
                        }
                    }
                    else{
                        handlers.handleSuccess(res, updateParams, 'Course updated', 200);
                    }
                })
            }
            else{
                handlers.handleError(res, 'Cannot find course with id', 404);
            }
        })
    })
});

//Only Admins can delete courses
router.delete('/api/courses/:id', function (req, res) {
    handlers.checkAdmin(req, res, function(admin) {
        Course.findOne({_id: req.params.id}, function (err, course) {
            if (err){
                if (err.name == 'CastError'){
                    handlers.handleError(res, 'Cannot find course with id', 404);
                }
                else{
                    handlers.handleError(res, err);
                }
            }
            else if (course){
                course.remove(function (err) {
                    if (err){
                        handlers.handleError(res, err);
                    }
                    else{
                        handlers.handleNoContent(res);
                    }
                })
            }
            else{
                handlers.handleError(res, 'Cannot find course with id', 404);
            }
        })
    });
});

//Admins can add languages only.
router.post('/api/languages', function (req, res) {
   handlers.checkAdmin(req, res, function (admin) {
       var l = new Language();
       l.language = req.body.language;
       l.save(function (err, newLanguage) {
           if (err){
               if (err.code == 11000 || err.code == 11001){
                   handlers.handleError(res, 'Language already exists', 409);
               }
               else{
                   handlers.handleError(res, err, 400);
               }
           }
           else{
               handlers.handleSuccess(res, newLanguage, 'Created Language', 201);
           }
       });
   });
});

//Only Admins can edit languages
router.put('/api/languages/:id', function (req, res) {
    handlers.checkAdmin(req, res, function (admin) {
        Language.findOne({_id: req.params.id}, function (err, language) {
            if (err){
                if (err.name == 'CastError'){
                    handlers.handleError(res, 'Cannot find language with id', 404);
                }
                else{
                    handlers.handleError(res, err);
                }
            }
            else if (language){
                var updateParams = req.body;
                delete updateParams._id;
                language.update(req.body, {runValidators: true}, function (err) {
                    if (err){
                        if (err.code == 11000 || err.code == 11001){
                            handlers.handleError(res, err, 409);
                        }
                        else{
                            handlers.handleError(res, err, 400);
                        }
                    }
                    else{
                        handlers.handleSuccess(res, updateParams, 'Language updated', 200);
                    }
                })
            }
            else{
                handlers.handleError(res, 'Cannot find language with id', 404);
            }
        })
    })
});

//Only Admins can delete languages
router.delete('/api/languages/:id', function (req, res) {
    handlers.checkAdmin(req, res, function(admin) {
        Language.findOne({_id: req.params.id}, function (err, language) {
            if (err){
                if (err.name == 'CastError'){
                    handlers.handleError(res, 'Cannot find language with id', 404);
                }
                else{
                    handlers.handleError(res, err);
                }
            }
            else if (language){
                language.remove(function (err) {
                    if (err){
                        handlers.handleError(res, err);
                    }
                    else{
                        handlers.handleNoContent(res);
                    }
                })
            }
            else{
                handlers.handleError(res, 'Cannot find language with id', 404);
            }
        })
    });
});



// //Only admins can add countries
// router.post('/api/countries', function (req, res) {
//     handlers.checkAdmin(req, res, function (admin) {
//         var c = new Country();
//         c.country = req.body.country;
//         c.save(function (err, newCountry) {
//             if(err){
//                 if (err.code == 11000 || err.code == 11001){
//                     handlers.handleError(res, 'Country already exists', 409);
//                 }
//                 else{
//                     handlers.handleError(res, err, 400);
//                 }
//             }
//             else{
//                 handlers.handleSuccess(res, newCountry, 'Country created', 201);
//             }
//         })
//     });
// });
// //Only admins can remove countries
// router.delete('/api/countries/:id', function (req, res) {
//     handlers.checkAdmin(req, res, function (admin) {
//         Country.findOne({_id: req.params.id}, function (err, country) {
//             if (err){
//                 if (err.name == 'CastError'){
//                     handlers.handleError(res, 'Cannot find country with id', 404);
//                 }
//                 else{
//                     handlers.handleError(res, err);
//                 }
//             }
//             else if (country){
//                 country.remove(function (err) {
//                     if (err){
//                         handlers.handleError(res, err);
//                     }
//                     else{
//                         handlers.handleNoContent(res);
//                     }
//                 });
//             }
//             else{
//                 handlers.handleError(res, 'Cannot find country with id', 404);
//             }
//         });
//     });
// });
// //Only admins can create genres
// router.post('/api/genres', function (req, res) {
//     handlers.checkAdmin(req, res, function (user) {
//         var g = new Genre();
//         g.genre = req.body.genre;
//         g.save(function (err, newGenre) {
//             if (err){
//                 if (err.code == 11000 || err.code == 11001){
//                     handlers.handleError(res, 'Genre already exists', 409);
//                 }
//                 else{
//                     handlers.handleError(res, err, 400);
//                 }
//             }
//             else{
//                 handlers.handleSuccess(res, newGenre, 'New genre created', 201);
//             }
//         });
//     });
// });
// router.delete('/api/genres/:id', function (req, res) {
//     handlers.checkAdmin(req, res, function (user) {
//         Genre.findOne({_id: req.params.id}, function (err, genre) {
//             if (err){
//                 if (err.name == 'CastError'){
//                     handlers.handleError(res, 'Genre doesnt exist with id', 404);
//                 }
//                 else{
//                     handlers.handleError(res, err);
//                 }
//             }
//             else if (genre){
//                 genre.remove(function (err) {
//                     if (err){
//                         handlers.handleError(res, err);
//                     }
//                     else{
//                         handlers.handleNoContent(res);
//                     }
//                 });
//             }
//             else{
//                 handlers.handleError(res, 'Genre doesnt exist with id', 404);
//             }
//         })
//     });
// });
// router.post('/api/audiences', function (req, res) {
//     handlers.checkAdmin(req, res, function (user) {
//         var a = new Audience();
//         a.audience = req.body.audience;
//         a.save(function (err, newAudience) {
//             if (err){
//                 if (err.code == 11000 || err.code == 11001){
//                     handlers.handleError(res, 'Audience already exists', 409);
//                 }
//                 else{
//                     handlers.handleError(res, err, 400);
//                 }
//             }
//             else{
//                 handlers.handleSuccess(res, newAudience, 'Created new audiences', 201);
//             }
//         });
//     });
// });
// router.delete('/api/audiences/:id', function (req, res) {
//     handlers.checkAdmin(req, res, function (user) {
//         Audience.findOne({_id: req.params.id}, function (err, audience) {
//             if (err){
//                 if (err.name == 'CastError'){
//                     handlers.handleError(res, 'Audience doesnt exist', 404);
//                 }
//                 else{
//                     handlers.handleError(res, err);
//                 }
//             }
//             else if (audience){
//                 audience.remove(function (err) {
//                     if (err){
//                         handlers.handleError(res, err);
//                     }
//                     else{
//                         handlers.handleNoContent(res);
//                     }
//                 });
//             }
//             else{
//                 handlers.handleError(res, 'Audience doesnt exist', 404);
//             }
//         })
//     });
// });
//Admin operation to view all users
router.get('/api/users', function (req, res) {
    handlers.checkAdmin(req, res, function (user) {
        var query;
        if (req.query.search_string){
            var queryParams = {
                $or: [
                    {
                        firstName: {
                            $regex: ".*"+req.query.search_string+".*"
                        }
                    },
                    {
                        email: {
                            $regex: ".*"+req.query.search_string+".*"
                        }
                    }
                ]
            };
            query = User.find(queryParams, 'firstName email role');
        }
        else{
            query = User.find({}, 'firstName email role');
        }
        if (req.query.limit){
            query.limit(parseInt(req.query.limit));
        }
        if (req.query.offset){
            query.skip(parseInt(req.query.offset));
        }
        query.exec(function (err, users) {
            if (err){
                handlers.handleError(res, err);
            }
            else{
                handlers.handleSuccess(res, users, 'Executed user query', 200);
            }
        });
    });
});
//Admin operation to change a user's role
router.put('/api/users/:id/role', function (req, res) {
    handlers.checkAdmin(req, res, function (user) {
        User.findOne({_id: req.params.id}, function (err, user) {
            if(err){
                if (err.code == 11000 || err.code == 11001){
                    handlers.handleError(res, 'User does not exist', 404);
                }
                else{
                    handlers.handleError(res, err);
                }
            }
            else if (user){
                var updateParams = {
                    role: req.body.role
                };
                user.update(updateParams, {runValidators: true}, function (err) {
                    if (err){
                        handlers.handleError(res, err, 400);
                    }
                    else{
                        handlers.handleSuccess(res, updateParams, 'Updated user role', 200);
                    }
                })

            }
            else{
                handlers.handleError(res, 'User does not exist', 404);
            }
        });
    });
});

module.exports = router;
