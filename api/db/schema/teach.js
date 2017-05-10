
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TeachSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        unique:true
    },
    isTeaching:{
      type: String,
      default: "false"
    },
    courseId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    form: {
        type: String
    },
    startDate: {
        type: Date,
        default: Date.now
    }
});

exports.Teach = mongoose.model('Teach', TeachSchema);
