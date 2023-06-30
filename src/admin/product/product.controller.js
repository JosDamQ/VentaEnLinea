'use strict'

const Product = require('./product.model');
const Category = require('../category/category.model');

exports.test = (req, res)=>{
    res.send({message: 'Test function is running'});
}

//Agregar

exports.addProduct = async(req, res)=>{
    try{
        let data = req.body;
        let dataRequired = data.category;
        if(!dataRequired) return res.status(400).send({message: 'This param is required'});
        let existCategory = await Category.findOne({_id: data.category});
        if(!existCategory) return res.status(400).send({message: 'Category not found'});
        let newProduct = new Product(data);
        newProduct.save();
        return res.status(201).send({message: 'Product created succesfully'});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error creating a product'});
    }
}

//Ver productos

exports.getProducts = async(req, res)=>{
    try{
        let getProducts = await Product.find().populate('category');
        return res.send({message: 'Products found:', getProducts});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error getting the products'})
    }
}

//Obtener producto

exports.getProduct = async(req, res)=>{
    try{
        let productId = req.params.id;
        let product = await Product.findOne({_id: productId}).populate('category');
        if(!product) return res.status(404).send({message: 'Product not found'});
        return res.send({message: 'Product founded', product});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error getting this product'});
    }
}

//Actualizar

exports.updateProduct = async(req, res)=>{
    try{
        let productId = req.params.id;
        let data = req.body;
        let existCategory = await Category.findOne({_id: data.category});
        if(!existCategory) return res.status(404).send({message: 'Category not found'});
        let editProduct = await Product.findOneAndUpdate(
            {_id: productId},
            data,
            {new: true}
        ).populate('category');
        if(!editProduct) return res.send({message: 'Product not found'});
        return res.send({message: 'Product uptated: ', editProduct});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error updating product'});
    }
}

//Eliminar

exports.deleteProduct = async(req, res)=>{
    try{
        let productId = req.params.id;
        let deleteProduct = await Product.findOneAndDelete({_id: productId});
        if(!deleteProduct) return res.status(404).send({message: 'Producto not found'});
        return res.send({message: 'Product delete succesfully: ', deleteProduct});
    }catch(err){
        console.error();
        return res.status(500).send({message: 'Error deleting product'});
    }
}
