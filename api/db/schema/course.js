var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CourseSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    name: {
      type: String,
      required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    school: {
        type: String,
        required: true
    },
    professor: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    description: {
        type: String
    }

});

exports.Course = mongoose.model('Course', CourseSchema);
