'use strict'

const userModel = require('../users/userModel');
const callBackResponse = require('../../services/callBackResponseService');

//add New Post
module.exports.newUser = function (body, res, callBack) {
    console.log("body in service side");
    console.log(body);

    const user = new userModel();
    user.id = body.id;
    user.name = body.name;
    user.role = body.role;
    console.log("user");

    user.save(function (err, user) {
        if (err) {
            callBack(callBackResponse.callbackWithDefaultError());
        } else {
            callBack(callBackResponse.callbackWithData(user));
        }
    });

};

// module.exports.addFollower = function (body, res, callBack) {
//     console.log("body in service side");
//     console.log(body.follower);
//     userModel.update({id:body.id},{followers:body.follower}).exec(function(err,data){
//         if (err) {  
//             callBack(callBackResponse.callbackWithDefaultError());
//         } else {
//             callBack(callBackResponse.callbackWithData(data));
//         }
//     });

// };
module.exports.findUserById = function (body, res, callback) {
    var a = callback;
    var ObjectId = require('mongodb').ObjectID;
    userModel.find({ "_id": ObjectId(body.id) }).exec(function (err, data) {
        if (err) {
            a(callBackResponse.callbackWithDefaultError());
        } else {
            a(callBackResponse.callbackWithData(data));
        }
    });
};


//addFollower
module.exports.addFollower = function (body, res, callBack) {
    //find the follower in user collection
    // Docs.mongodb.com. (2018). $elemMatch (query) — MongoDB Manual. [online] Available at:
    //  https://docs.mongodb.com/manual/reference/operator/query/elemMatch/index.html [Accessed 10 Sep. 2018].
    userModel.find({ followers: { $elemMatch: { id: body.follower.id } } }, function (err, follower) {

        if (err) {
            callBack(callBackResponse.callbackWithDefaultError());
        }
        else if (follower == null || follower == undefined || follower.length == 0) {
            // Docs.mongodb.com. (2018). $push — MongoDB Manual. [online] Available at: 
            // https://docs.mongodb.com/manual/reference/operator/update/push/#up._S_push [Accessed 9 Sep. 2018].
            userModel.update(

                { _id: body._id },
                { $push: { followers: body.follower } }, function (err, follow) {

                    if (err) {
                        callBack(callBackResponse.callbackWithDefaultError());
                    }
                    else if (follow == null || follow == undefined) {
                        callBack(callBackResponse.callbackWithfalseMessage('User does not exist'));
                    }
                    else {
                        callBack(callBackResponse.callbackWithData(follow));
                    }
                });
        }
        else {
            callBack(callBackResponse.callbackWithfalseMessage('Follower Already added'));
        }
    });
};
