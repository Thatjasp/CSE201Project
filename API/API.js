const express = require('express');
const mongoose = require('mongoose');
const appRoute = require('./Routers/AppRoute.js');
const AccountRoute = require('./Routers/AccountRoute.js');
const formRoute = require('./Routers/AppForm.js');
const path = require('path');
const site = express();
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const fetch = require('node-fetch');
const { indexOf } = require('underscore');
const { MemoryStore } = require('express-session');

site.use(express.urlencoded({
    extended:false
}))
site.use(express.json());
site.use(cookieParser());

mongoose.connect('mongodb+srv://salinaj2:Tota2011@apprepo.hjlsg.mongodb.net/CSE201?retryWrites=true&w=majorityy',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
var siteUrl = path.resolve('../Progect Group 4 (All Of Cynthia\'s Computer Files)/_Most Recent Versions/');
site.use('/testIndex.js', express.static(siteUrl +'/testIndex.js'))
site.use('/img',express.static(path.resolve('../Progect Group 4 (All Of Cynthia\'s Computer Files)/img/')));
site.use('/modules',express.static(path.resolve('../modules/')));


site.use(cors());
site.use(session({
    name:'sid',
    resave:true,
    secure:false,
    saveUninitialized:true,
    secret:'sercret',
    store: new MemoryStore(),
    cookie: {
        sameSite: true,
        secure:false,
        maxAge: 60*60*1000
    }
}));

site.use('/Apps',appRoute);
site.use('/Accounts',AccountRoute);
site.use('/AppForms',formRoute);

site.get('/AdminPage.html',(req,res) =>{
    if(req.session.userType != 'admin')
        res.redirect('localhost:8080/');
    else 
        res.sendFile(siteUrl + '/AdminPage.html');
});

site.get('/AppRequestForm.html', (req,res) => {
    if(!req.session.userType){
        res.redirect('/')
    } else {
        res.sendFile(siteUrl+'/AppRequestForm.html');
    }
});

site.get('/AppPage', (req,res) => {
    res.sendFile(siteUrl + "/AppPage.html");
});

site.get('/',(req,res) => {
    res.sendFile(path.resolve('../Progect Group 4 (All Of Cynthia\'s Computer Files)/_Most Recent Versions/MetaAppIndex.html'));
});
site.post('/UserSession/:id', async (req,res) => {
    var obj = await fetch(`http://localhost:8080/Accounts/User/${req.params.id}`).then(response => {
        return response.json();
    });
    if (!req.body){
        return res.status(400).send();
    }
    try {
        if (obj.password == req.body.pass){
            req.session.userType = obj.userType;
            res.send(req.session.userType);
        }else {
            res.status(404).send();
        }
    } catch {
        return res.status('404').send(obj);
    }
});
site.listen(8080,() => {
    console.log('Listening on localhost:8080');
});

