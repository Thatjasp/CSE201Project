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

const appInfo = new Schema({
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