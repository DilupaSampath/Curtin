'use strict'

const responce = require('../../services/responseService');
const service = require('../users/userService');      

/**
 * Add new catagory to the system
 * @param {*} req               
 * @param {*} res 
 */
module.exports.addUser = function (req, res) {
    //call add post to the database method
    console.log(req.body);
    service.newUser(req.body, res, function (data) {
        if (data.status) {
            return responce.successWithData(data.data, res);
        } else {
            return responce.customError(data.data, res);
        }
    })
};

/**
 * Add follower
 * @param {*} req               
 * @param {*} res 
 */
module.exports.addFollower = function (req, res) {
    //call add follower to the database method
    console.log(req.body);
    service.addFollower(req.body, res, function (data) {
        if (data.status) {
            return responce.successWithData(data.data, res);
        } else {
            return responce.customError(data.data, res);
        }
    })
};


module.exports.findUser = function(req,res){
service.findUserById(req.body,res,function(data){
    if (data.status) {
        return responce.successWithData(data.data, res);
    } else {
        return responce.customError(data.data, res);
    }
});
};