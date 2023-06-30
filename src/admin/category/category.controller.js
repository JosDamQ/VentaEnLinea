'use strict'
// <> ``

const Category = require('./category.model');
const Product = require('../product/product.model');

exports.test = (req, res)=>{
    res.send({message: 'Test function is running'});
}

//Poner default a los productos
exports.defaultCategory = async(req, res)=>{
    try{
        let defaultCategory = {
            name: 'Default',
            description: 'Default Category'
        }
        let existCategory = await Category.findOne({name: 'Default'});
        if(existCategory) return console.log('Default category is already created');
        let createdDefault = new Category(defaultCategory);
        await createdDefault.save();
        return console.log('Default category created.');
    }catch(err){
        console.error(err);
    }
}

//Agregar

exports.addCategory = async(req, res)=>{
    try{
        let data = req.body;
        let existCategory = await Category.findOne({name: data.name});
        if(existCategory) return res.send({message: 'Category already created'});
        let newCategory = new Category(data);
        await newCategory.save();
        return res.status(201).send({message: 'Category create succesfully'});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error creating a category'});
    }
}

//Ver categories

exports.getCategories = async(req, res)=>{
    try{
        let categories = await Category.find();
        return res.send({categories});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'error getting categories'})
    }
}

//Editar

exports.updateCategory = async(req, res)=>{
    try{
        let data = req.body;
        let categoryId = req.params.id;
        let existCategory = await Category.findOne({name: data.name});
        if(existCategory){
            if(existCategory._id != categoryId) return res.send({message:'Category already created'});
            let updateCategory = await Category.findOneAndUpdate(
                {_id: categoryId},
                data,
                {new: true}
            );
            if(!updateCategory) return res.send.status(404).send({message:'Category not found'});
            return res.send({updateCategory});
        }
        let updateCategory = await Category.findOneAndUpdate(
            {_id: categoryId},
            data,
            {new: true}
        );
        if(!updateCategory) return res.send.status(404).send({message:'Category not found'});
        return res.send({updateCategory});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error getting category'});
    }
}

//Eliminar

exports.deleteCategory = async(req, res)=>{
    try{
        let categoryId = req.params.id;
        let defaultCategory = await Category.findOne({name: 'Default'});
        if(defaultCategory._id == categoryId) return res.send({message: 'Default category cannot be deleted'});
        await Product.updateMany(
            {category: categoryId},
            {category: defaultCategory._id}
        );
        let deletedCategory = await Category.findOneAndDelete({_id: categoryId});
        if(!deletedCategory) return res.status(404).send({message: 'Category not found and not deleted'});
        return res.send({message: 'Category deleted succesfully', deletedCategory});

    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error deleting category'})
    }
}