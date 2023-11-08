const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: {
        required:true,
        type:String
    },
    tech: {
        required:true,
        type:[String],
    },
    range: {
        required:true,
        type:String
    },
    description: {
        type:String
    },
    url: {
        required:true,
        type:[String]
    }
});

module.exports = mongoose.model('Project', projectSchema);