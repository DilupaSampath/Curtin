//import validator class
'use strict';
const joi = require('joi');

//Comment Schema for new comment 
module.exports.user = joi.object().keys({
    id: joi.string().required(),  
    name: joi.string().required(),
    role: joi.string().required(),
    followers: joi.array(),
}); 