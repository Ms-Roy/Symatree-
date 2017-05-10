/**
 * Created by ericdufresne on 2017-02-16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CompanySchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    logoURL: {
        type: String
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    country: {
        type: String,
        required: true
    },
    contactEmail: {
        type: String,
        required: true,
        unique: true
    },
    website: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    address: {
        type: String
    },
    description: {
        type: String
    }
});

exports.Company = mongoose.model('Company', CompanySchema);
