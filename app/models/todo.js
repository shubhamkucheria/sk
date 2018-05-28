var mongoose = require('mongoose');

//here we initialize databse inserting params
module.exports = mongoose.model('Food', {
    text: {
        type: String,
        default: ''
    }
});
