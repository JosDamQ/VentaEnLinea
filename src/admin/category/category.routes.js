'use strict'

const categoryController = require('./category.controller');
const express = require('express');
const api = express.Router();
const { ensureAuth } = require('../../services/authenticated');

api.get('/', categoryController.test);
api.post('/add', ensureAuth , categoryController.addCategory);
api.get('/get', categoryController.getCategories);
api.put('/update/:id', ensureAuth , categoryController.updateCategory);
api.delete('/delete/:id', ensureAuth , categoryController.deleteCategory);

module.exports = api;

