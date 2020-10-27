const mongoose = require('mongoose');
const Joi = require('joi')

const Schema = mongoose.Schema;
module.exports.accountSchema = new Schema({
    username: String,
    password: String,
    _id:String,
    userType: String
},{
  writeConcern: {
    w:'majority',
    j:true,
    wtimeout: 1000
}
});
module.exports.joiAccount = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    _id:Joi.string().required(),
    userType: Joi.string().optional()
});
