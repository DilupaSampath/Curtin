//import validator class
const joi = require('joi');

//Comment Schema for new comment 
module.exports.newComment = joi.object().keys({
    user: joi.string().required(),  
    title: joi.string().required(),
    body: joi.string().required(),
}); 