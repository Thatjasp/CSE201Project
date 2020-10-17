const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Joi = require('Joi');
const _ = require('underscore');

mongoose.connect('mongodb+srv://salinaj2:Tota2011@apprepo.hjlsg.mongodb.net/CSE201?retryWrites=true&w=majorityy',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const Schema = mongoose.Schema;

const formInfo = new Schema({
    _id: String,
    description: String,
    organization: String,
    platforms: [String],
    versions: String,
    link: String,
    price: Number
},{
  writeConcern: {
    w:'majority',
    j:true,
    wtimeout: 1000
}
});

const appSchema = Joi.object({
    _id: Joi.string().required(),
    description: Joi.string().required(),
    organization: Joi.string().required(),
    platforms: Joi.array().items(Joi.string()).required(),
    versions: Joi.string().required(),
    link: Joi.string().required(),
    price: Joi.number().required()
});

const formModel = mongoose.model('AppForm',formInfo);

router.get('/getForms', async (req,res) => {
    await formModel.find({},(err,list) => {
        if(err){
           return res.status(500).send("Error trying to find Forms");
        } else if (!list){
            return res.status(404).send("Forms not found");
        } else {
            return res.send(list);
        }
    });
});

router.post('/sendForms', async (req,res) => {
    let {error} = appSchema.validate(req.body);
    if (error){
        return res.status(400).send(error.details[0]);
    }
    await formModel.create(req.body,(error,obj) => {
        if (error){
            return res.status(500).send("Error Creating Object");
        } else if (!obj) {
            return res.status(404).send("Object not created");
        } else {
            return res.send(obj);
        }
    });

});

router.put('/sendForms/:id', async (req,res) => {
    let body = validateJSON(req.body);
    if(!body){
        return res.status(400).send("Must send JSON");
    }
    await formModel.findByIdAndUpdate(req.params.id,body,(err,obj) =>{
        if(err){
            return res.status(500).send("Error in Server");
        } else if (!obj) {
            return res.status(404).send("ID not Found");
        } else {
            return res.send("Updated Sucessfully");
        }
    });
});

function validateJSON(body) {
    if(_.isEmpty(body)){
        return null;
    }
    return body;
}
module.exports = router;