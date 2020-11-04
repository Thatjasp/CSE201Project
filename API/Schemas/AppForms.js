const Joi = require('joi');
const mongoose = require('mongoose');


const Schema = mongoose.Schema;

module.exports.appSchema = new Schema({
    _id: String,
    nameApp: String,
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
    _id: Joi.string().required(),
    nameApp: Joi.string().optional(),
    description: Joi.string().optional(),
    organization: Joi.string().optional(),
    platforms: Joi.array().items(Joi.string().optional()),
    versions: Joi.string().optional(),
    link: Joi.string().required(),
    price: Joi.number().optional()
});