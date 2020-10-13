const express = require('express');
const mongoose = require('mongoose');
const Joi = require('Joi');
const router = express.Router();

mongoose.connect('mongodb+srv://salinaj2:Tota2011@apprepo.hjlsg.mongodb.net/CSE201?retryWrites=true&w=majorityy', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Schema = mongoose.Schema;

const Account = new Schema({
    _id: String,
    password: String,
    userType: String
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
            res.status(500).send();
        } else if (!list) {
            res.status(404).send();
        } else {
            res.send(list);
        }
    });
});

router.get('/User', async (req, res) => {
    let changes = validateJSON(req.body);
    if(!changes)
        res.status(400).send();
    accountModel.findOne(changes, (err,list) => {
        if(err){
            res.status(500).send();
        }else if(!list){
            res.status(404).send();
        }else{
            res.send(list);
        }
    });
});

router.post('/newUser', async (req, res) => {

});

router.put('/updateUser', async (req, res) => {

});

function validateJSON(body) {
    try {
        var data = JSON.parse(body);
        return data;
    } catch {
        return null;
    }
}
module.exports = router;