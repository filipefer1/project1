const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Project = new Schema({
    title: {
        type: String,
        required: true
    },
    tasks: [
        {
            type: Schema.Types.ObjectId,
            ref: "Task"
        }
    ]
    
}, {
    timestamps: true
});

module.exports = mongoose.model('Project', Project);