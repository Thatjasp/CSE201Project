const express = require('express');
const mongoose = require('mongoose');
const appRoute = require('./Routers/AppRoute.js');
const AccountRoute = require('./Routers/AccountRoute.js');
const formRoute = require('./Routers/AppForm.js');
const path = require('path');
const site = express();
const cors = require('cors');
site.use(express.json());
site.use(express.static(path.resolve(__dirname,'../modules')));
mongoose.connect('mongodb+srv://salinaj2:Tota2011@apprepo.hjlsg.mongodb.net/CSE201?retryWrites=true&w=majorityy',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
site.use(express.static('../modules'));
site.use(cors());
site.use('/Apps',appRoute);
site.use('/Accounts',AccountRoute);
site.use('/AppForms',formRoute);

site.get('/',(req,res) => {
    res.sendFile(path.resolve('../MetaAppIndex - Version 3.4 - Link Around Logo.html'));
});

site.listen(8080,() => {
    console.log('Listening on localhost:8080');
});

