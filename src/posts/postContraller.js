'use strict'
const response = require('../../services/responseService');
const service = require('../posts/postService');

/**
 * Add new catagory to the system
 * @param {*} req               
 * @param {*} res 
 */
module.exports.addPost = function (req, res) {
    //call add post to the database method
    service.newPost(req.body, res, function (data) {
        if (data.status) {
            return response.successWithData(data.data, res);
        } else {
            return response.customError(data.data, res);
        }
    })
};      


/**
 * get posy by request type
 * @param {*} req               
 * @param {*} res 
 */
module.exports.getPost = function (req, res) {
    service.getposts(req.body, res, function (data) {
        if (data.status) {
            return response.successWithData(data.data, res);
        } else {
            return response.customError(data.data, res);
        }
    })
};  



/**
 * get posy by request type
 * @param {*} req               
 * @param {*} res 
 */
module.exports.makeVote = function (req, res) {
    service.makeVote(req.body, res, function (data) {
        if (data.status) {
            return response.successWithData(data.data, res);
        } else {
            return response.customError(data.data, res);
        }
    })
};  