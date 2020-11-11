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
    _id: Joi.string().required(),
    description: Joi.string().allow('').optional(),
    organization: Joi.string().allow('').optional(),
    platforms: Joi.array().empty(['']).default([]).items(Joi.string().allow('').optional()),
    versions: Joi.string().allow('').optional(),
    link: Joi.string().required(),
    price: Joi.number().empty(NaN).default(0).optional()
});