/**
 * Created by ericdufresne on 2017-03-14.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CourseSchema = new Schema({
      code: {
        type: String,
        required: true,
        unique: true
    },
      name: {
        type: String,
        required: true,
        unique: true
    },
    school: {
      type: String,
      required: true,

    },
    professor: {
        type: String,

    },
    semester: {
        type: String,
    },
    year: {
        type: Number,
    },

});
exports.Course = mongoose.model('Course', CourseSchema);
