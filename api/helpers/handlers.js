/**
 * Created by ericdufresne on 2017-02-13.
 */
var express = require('express');
var app = express();
var jwt = require('jwt-simple');
var config = require('../config').config;
var secret = config[app.settings.env].jwtSecret;
var User = require('../db/schema/user').User;

function colorify(str, color){
    var brightString = "\x1b[1m"+str;
    if (color == 'red'){
        return "\x1b[31m"+brightString+"\x1b[0m";
    }
    else if (color == 'green'){
        return "\x1b[32m"+brightString+"\x1b[0m";
    }
    else if (color == 'yellow'){
        return "\x1b[33m"+brightString+"\x1b[0m";
    }
    else{
        return brightString+"\x1b[0m";
    }
}
exports.checkAdmin = function (req, res, callback) {
    exports.checkAuth(req, res, function (user) {
        if (user.role === 'admin'){
            callback(user);
        }
        else{
            exports.handleError(res, 'User is not authorized to perform this operation', 403);
        }
    });
};
exports.checkAuth = function (req, res, callback) {
    var token = req.headers['symatree-auth'];
    if (!token){
        exports.handleError(res, 'No token provided. Cant authenticate', 403);
        return;
    }
    var user;
    try{
        user = jwt.decode(token, secret);
    }
    catch(err){
        exports.handleError(res, 'Bad token. Cant authenticate', 403);
        return;
    }
    User.findOne({_id: user._id}, function (err, found) {
        if (err){
            if (err.name == 'CastError'){
                exports.handleError(res, 'User not found', 404);
            }
            else{
                exports.handleError(res, err);
            }
        }
        else if (found){
            callback(found);
        }
        else{
            exports.handleError(res, 'User not found', 404);
        }
    });
};
exports.handleError = function (res, error, code) {
    code = code || 500;
    error = error || '';
    res.status(code).json({success: false, message: getStatusCodeDesc(code)+error});
};
exports.handleNoContent = function (res) {
    res.status(204).end();
};
exports.handleSuccess = function (res, body, message, code){
    code = code || 200;
    if (body == null){
        res.status(404).json(null);
        return;
    }
    else{
        body.success = true;
    }
    body['message'] = getStatusCodeDesc(code)+message;
    res.status(code).json(body);
};
function getStatusCodeDesc(code){
    switch(code){
        case 400:
            return "400 Bad Request: ";
        case 403:
            return "403 Forbidden: ";
        case 404:
            return "404 Not Found: ";
        case 409:
            return "409 Conflict: ";
        case 500:
            return "500 Internal Server Error: ";
        case 503:
            return "503 Service Unavailable: ";
        case 200:
            return '200 Success';
        case 201:
            return '201 Created Object';
        case 204:
            return '204 No Content';
    }
    return "";
}
