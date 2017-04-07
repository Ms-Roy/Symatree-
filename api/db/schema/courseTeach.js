var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CourseTeachSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
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
    name: {
        type: String,
        required: true,
        unique: true
    }
});

exports.Company = mongoose.model('CourseTeach', CourseTeachSchema);
