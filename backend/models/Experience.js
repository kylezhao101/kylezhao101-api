const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
    organization: {
        required: true,
        type:String
    },
    position: {
        required: true,
        type:String
    },
    startDate:{
        required: true,
        type:String
    },
    endDate:{
        type:String,
        default:null
    },
    description:{
        type:String,
        default:null
    }
});

module.exports = mongoose.model('Experience', experienceSchema);