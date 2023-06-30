'use strict'

const productController = require('./product.controller');
const express = require('express');
const api = express.Router();
const { ensureAuth } = require('../../services/authenticated');

api.get('/test', productController.test);
api.post('/add', ensureAuth , productController.addProduct);
api.get('/gets', productController.getProducts);
api.get('/get/:id', productController.getProduct);
api.put('/update/:id', ensureAuth , productController.updateProduct);
api.delete('/delete/:id', ensureAuth , productController.deleteProduct);

module.exports = api;