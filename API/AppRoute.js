const express = require('express');
const mongoose = require('mongoose');
const Joi = require('Joi');
const router = express.Router();

mongoose.connect('mongodb+srv://salinaj2:Tota2011@apprepo.hjlsg.mongodb.net/CSE201?retryWrites=true&w=majorityy', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Schema = mongoose.Schema;

const appInfo = new Schema({
    name: String,
    description: String,
    organization: String,
    platforms: [String],
    versions: String,
    link: String,
    price: Number
});

const appSchema = Joi.object({
    name: Joi.string().required(),
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
            res.status(500).send();
        } else {
            if (!list) {
                res.status(404).send();
            } else {
                res.send(list);
            }
        }
    });
});

router.post('/sendApps', async (req, res) => {
    let {
        error
    } = appSchema.validate(req.body);
    if (error) {
        res.status(400).send(error.details[0]);
    }
    let newApp = createNewApp(req) 
    newApp.save();
});

function createNewApp(req) {
    return new appModel({
        name: req.params.name,
        description: req.params.description,
        organization: req.params.organization,
        platforms: req.params.platforms,
        versions: req.params.versions,
        link: req.params.link,
        price: req.params.price
    });
}

router.put('/sendApps/:id/:attribute', async (req, res) => {
    let id = req.params.id;
    let app = await appModel.findById(id);
    var obj = {};
    obj[req.params.attribute] = "bruh";
    app.set(obj);

});

module.exports = router;