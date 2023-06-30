'use strict'

require('dotenv').config();
const mongoConfig = require('./config/mongo');
const app = require('./config/app');
const CategoryController = require('./src/admin/category/category.controller');

mongoConfig.connect();
app.initServer();
CategoryController.defaultCategory();