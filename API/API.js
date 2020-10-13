const express = require('express');
const mongoose = require('mongoose');
const appRoute = require('./AppRoute.js');
const AccountRoute = require('./AccountRoute.js');
const formRoute = require('./AppForm.js');
const site = express();

mongoose.connect('mongodb+srv://salinaj2:Tota2011@apprepo.hjlsg.mongodb.net/CSE201?retryWrites=true&w=majorityy',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

site.use('/Apps',appRoute);
site.use('/Accounts',AccountRoute);
site.use('/AppForms',formRoute);

site.listen(8080,() => {
    console.log('Listening on localhost:8080');
});

