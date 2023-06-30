'use strict'

const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        uppercase: true
    },
    price:{
        type: Number,
        required: true
    },
    stock:{
        type: Number,
        required: true
    },
    category:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Category'
    }
});

module.exports = mongoose.model('Product', productSchema);