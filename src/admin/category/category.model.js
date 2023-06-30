'use strict'

const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        uppercase: true
    }, 
    description: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Category', categorySchema);