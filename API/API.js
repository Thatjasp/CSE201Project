const express = require('express');
const mongoose = require('mongoose');
const appRoute = require('./Routers/AppRoute.js');
const AccountRoute = require('./Routers/AccountRoute.js');
const formRoute = require('./Routers/AppForm.js');
const site = express();
site.use(express.json());
mongoose.connect('mongodb+srv://salinaj2:Tota2011@apprepo.hjlsg.mongodb.net/CSE201?retryWrites=true&w=majorityy',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

site.use('/Apps',appRoute);
site.use('/Accounts',AccountRoute);
site.use('/AppForms',formRoute);

site.get('/',(req,res) => {
    res.send('Hello');
});

site.listen(8080,() => {
    console.log('Listening on localhost:8080');
});

