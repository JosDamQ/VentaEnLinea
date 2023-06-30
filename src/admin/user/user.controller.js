'use strict'
// <> ``

const User = require('./user.model');
const { validateData, encrypt, checkPassword } = require('../../utilis/validate');
const { createToken } = require('../../services/jwt');

exports.test = (req, res)=>{
    res.send({message: 'Test function is running', user: req.user});
}

exports.register = async(req, res)=>{
    try{
        let data = req.body;
        data.password = await encrypt(data.password);
        let user = new User(data);
        await user.save();
        return res.send({message: 'Account created sucessfully'});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error creating account', error: err.message});
    }
}

exports.login = async(req, res)=>{
    try{
        let data = req.body;
        let credentials = {
            username: data.username,
            password: data.password
        }
        let msg = validateData(credentials);
        if(msg) return res.status(400).send({message: msg});
        let user = await User.findOne({username: data.username});
        if(user && await checkPassword(data.password, user.password)) {
            let token = await createToken(user)
            return res.send({message: 'User logged succesfully',token});
        }
        return res.status(404).send({message: 'Invalid credentials'});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error not logged'});
    }
}

/*exports.updateUser = async(req, res)=>{
    try{
        let userId = req.params.id;
        let data = req.body;
        if(!userId != req.user.sub) return res.status(401).send({message: 'You dont have authorization to do this action'});
        if(data.password || Object.entries(data).length === 0 ||data.role) return res.status(404).send({message: 'You submit data that cannot be updated'});
        let userUpdate = await User.findOneAndUpdate(
            {_id: req.user.sub},
            data,
            {new: true}
        )
        if(!userUpdate) return res.status(404).send({message: 'User not found'});
        return res.send({message: 'User updated', userUpdate});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error updating user', err: `Username ${err.keValue.username} is already using`});
    }
}*/