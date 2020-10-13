const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Joi = require('Joi');


mongoose.connect('mongodb+srv://salinaj2:Tota2011@apprepo.hjlsg.mongodb.net/CSE201?retryWrites=true&w=majorityy',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

router.get('/getForms', async (req,res) => {

});

router.post('/sendForms', async (req,res) => {

});

router.put('/sendForms', async (req,res) => {

});

module.exports = router;