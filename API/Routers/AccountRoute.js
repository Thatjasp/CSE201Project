const express = require('express');
const mongoose = require('mongoose');
const Joi = require('Joi');
const router = express.Router();
const _ = require('underscore');

mongoose.connect('mongodb+srv://salinaj2:Tota2011@apprepo.hjlsg.mongodb.net/CSE201?retryWrites=true&w=majorityy', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Schema = mongoose.Schema;

const Account = new Schema({
    _id: String,
    password: String,
    userType: String
},{
  writeConcern: {
    w:'majority',
    j:true,
    wtimeout: 1000
}
});

const accountJoi = Joi.object({
    _id: Joi.string().required(),
    password: Joi.string().required(),
    userType: Joi.string().optional()
});

const accountModel = mongoose.model('Account', Account);

router.get('/Users', async (req, res) => {
    await accountModel.find({}, (err,list) =>{
        if(err){
            return res.status(500).send();
        } else if (!list) {
            return res.status(404).send();
        } else {
            return res.send(list);
        }
    });
});

router.get('/User/:id', async (req, res) => {
    await accountModel.findById(req.params.id, (err,obj) => {
        if(err){
            return res.status(500).send();
        }else if(!obj){
            return res.status(404).send();
        }else{
            return res.send(obj);
        }
    });
});

router.post('/newUser', async (req, res) => {
    let {error} = accountJoi.validate(req.body);
    if(error){
        return res.status(400).send(error.details[0]);
    }
   await accountModel.create(req.body,(err,obj)=>{
       if(err){
           return res.status(400).send("Error in Creating Object");
       } else {
           return res.send(obj);
       }
   });
    
});
router.put('/updateUser/:id', async (req, res) => {
    let body = validateJSON(req.body);
    if(!body){
        return res.status(404).send("JSON Not Found");
    }
    await accountModel.findByIdAndUpdate(req.params.id,body,(err,obj) => {
        if(err){
            return res.status(400).send();
        } else if (!obj) {
            return res.status(404).send('User Not found');
        } else {
            return res.send("Updated Successfully");
        }
    });
});

function validateJSON(body) {
    if(_.isEmpty()){
        return null;
    }
    return body;
}
module.exports = router;