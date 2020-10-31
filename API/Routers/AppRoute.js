const express = require('express');
const mongoose = require('mongoose');
const Joi = require('Joi');
const router = express.Router();
const _ = require('underscore');
const schemas = require('../Schemas/App')

const appInfo = schemas.appSchema;
const appSchema = schemas.appJoi;
const appModel = mongoose.model('App', appInfo);

router.get('/getApps', async (req, res) => {

    await appModel.find({}, (err, list) => {
        if (err) {
            return res.status(500).send();
        } else if (!list) {
                return res.status(404).send();
        } else {
            return res.send(list);
        }
    });
});
router.get('/getApp/:id', async (req, res) => {
    await appModel.findById(req.params.id, (err,obj) => {
        if(err){
            return res.status(500).send();
        }else if(!obj){
            return res.status(404).send();
        }else{
            return res.send(obj);
        }
    });
});

router.post('/sendApps', async (req, res) => {
    let {error} = appSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0]);
    }
    await appModel.create(req.body,(err,obj)=>{
        if(err){
            return res.status(500).send(err);
        } else if (!obj) {
            return res.status(500).send("Null Object");
        } else {
            return res.send(obj);
        }
    });
});


router.put('/sendApps/:id', async (req, res) => {
    let body = validateJSON(req.body);
    if(!body){
        return res.status(404).send("JSON needed");
    }
    let id = req.params.id;
    await appModel.findByIdAndUpdate(id,body,(err,obj)=>{
        if(err){
            return res.status(400).send("Error between communication with Database");
        }else if(!obj){
            return res.status(404).send("App Not Found");
        }else{
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