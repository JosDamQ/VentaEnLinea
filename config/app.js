'use strict'

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3200;
const categoryRoutes = require('../src/admin/category/category.routes');
const productRoutes = require('../src/admin/product/product.routes');
const userRoutes = require('../src/admin/user/user.routes');

//Coonfigurar server HTTP
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

//Rutas
app.use('/category', categoryRoutes);
app.use('/product', productRoutes);
app.use('/user', userRoutes);

//Levantar el server
exports.initServer = () =>{
    app.listen(port);
    console.log(`Server is running in port ${port}`);
}