/**
 * Created by ericdufresne on 2017-03-14.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LanguageSchema = new Schema({
    language: {
        type: String,
        required: true,
        unique: true
    }
});
exports.Language = mongoose.model('Language', LanguageSchema);
