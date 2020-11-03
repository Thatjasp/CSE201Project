const Joi = require('joi');
const mongoose = require('mongoose');


const Schema = mongoose.Schema;

module.exports.appSchema = new Schema({
    _id: String,
    description: String,
    organization: String,
    platforms: [String],
    versions: String,
    link: String,
    price: Number
}, {
    writeConcern: {
        w: 'majority',
        j: true,
        wtimeout: 1000
    }
});

module.exports.appJoi = Joi.object({
    _id: Joi.string().require(),
    description: Joi.string().required(),
    organization: Joi.string().required(),
    platforms: Joi.array().items(Joi.string()).required(),
    versions: Joi.string().required(),
    link: Joi.string().required(),
    price: Joi.number().required()
});