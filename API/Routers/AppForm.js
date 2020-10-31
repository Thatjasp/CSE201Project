const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const _ = require('underscore');
const schemas = require('../Schemas/App');
const formInfo = schemas.appSchema;
const appSchema = schemas.appJoi;

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

router.get('/getForm/:id', async (req, res) => {
    await formModel.findById(req.params.id, (err,obj) => {
        if(err){
            return res.status(500).send();
        }else if(!obj){
            return res.status(404).send();
        }else{
            return res.send(obj);
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