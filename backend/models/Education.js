const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
    institution: {
        required: true,
        type: String
    },
    url: {
        required: true,
        type: String
    },
    type: {
        required:true,
        type: String
    },
    major: {
        required: true,
        type: String
    },
    area: {
        type: String
    },
    startDate: {
        type: String
    },
    endDate: {
        type: String
    }
});

module.exports = mongoose.model('Education', educationSchema);