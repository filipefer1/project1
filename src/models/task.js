const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Task = new Schema({
    title: {
        type: String,
        required: true
    },
    projeto: {
        type: Schema.Types.ObjectId,
        ref: "Project"
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Task', Task);