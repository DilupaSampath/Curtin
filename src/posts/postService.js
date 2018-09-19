'use strict'
const userModel = require('../users/userModel');
const postModel = require('../posts/postModel');
const callBackResponse = require('../../services/callBackResponseService');

//add New Post
module.exports.newPost = function (body, res, callBack) {

    const post = new postModel();
    post.user = body.user;
    post.title = body.title;
    post.body = body.body;

    post.save(function (err, post) {
        if (err) {
            callBack(callBackResponse.callbackWithDefaultError());
        } else {
            callBack(callBackResponse.callbackWithData(post));
        }
    });

};

//get all posts 
module.exports.getposts = function (body, res, callBack) {
    var result = [];
    //check type field to filter by follower 
    if (body.type == 'follower') {
        userModel.findOne({ id: body.id }, function (err, user) {
            postModel.find().lean().exec(function (err, posts) {
                user.followers.forEach(function (user) {
                    posts.forEach(function (post) {
                        if (user.id == post.id) {
                            result.push(post);
                        } else { }
                    }, this);
                }, function () {
                    console.log(result);
                });
                callBack(callBackResponse.callbackWithData(result));
            });
        });
    } else {
        //get all posts without filterng
        postModel.find().lean().exec(function (err, posts) {
            if (err) {
                callBack(callBackResponse.callbackWithDefaultError());
            }
            else if (posts == null || posts == undefined || posts.length == 0) {
                callBack(callBackResponse.callbackWithData(posts));
            }
            else {
                callBack(callBackResponse.callbackWithData(posts));
            }
        });
    }
};

/**
 * update post
 */
module.exports.updatePost = function (body, res, callBack) {
    //find post from the database using _id
    postModel.findById(body.id).lean().exec(function (err, post) {
        if (err) {
            callBack(callBackResponse.callbackWithDefaultError());
        }
        else if (post == null || post == undefined || post.length == 0) {
            callBack(callBackResponse.callbackWithfalseMessage('Invalid Post ID'));
        }
        else {
            user._id = body.id;
            postModel.update({ _id: body.id }, user, function (err) {
                if (err) {
                    callBack(callBackResponse.callbackWithDefaultError());
                } else {
                    callBack(callBackResponse.callbackWithSucessMessage(' Sucessfully Updated'));
                }
            });
        }
    });
}




//delete post from the database
module.exports.deletePost = function (post_id, res, callBack) {
    //check post is on the database
    postModel.findById(post_id, function (error, res) {
        if (error) {
            callBack(callBackResponse.callbackWithDefaultError());
        }
        else if (res == null || res == undefined) {
            callBack(callBackResponse.callbackWithfalseMessage('Post Not Found'));
        } else {
            //delete post from the database
            postModel.remove({ _id: res._id }, function (err) {
                if (err) {
                    callBack(callBackResponse.callbackWithDefaultError());
                } else if (domain == null || domain == undefined || domain.length == 0) {
                    callBack(callBackResponse.callbackWithSucessMessage('Successfully voted'));
                } else {
                    callBack(callBackResponse.callbackWithfalseMessage('user already voted'));
                }
            });
        }
    });
};

//make votes
module.exports.makeVote = function (body, res, callBack) {
    //find wether voter make vote bofore 
    // Docs.mongodb.com. (2018). $elemMatch (query) — MongoDB Manual. [online] Available at:
    //  https://docs.mongodb.com/manual/reference/operator/query/elemMatch/index.html [Accessed 10 Sep. 2018].
    postModel.find({ votedList: { $elemMatch: { id: body.voterId.id } } }, function (err, responce) {
        if (err) {
            callBack(callBackResponse.callbackWithDefaultError());
        } else if (responce == null || responce == undefined || responce.length == 0) {
            //add vote
            postModel.update({ _id: body._id }, { $inc: { vots: 1 } }, function (err, resp) {
                if (err) {
                    callBack(callBackResponse.callbackWithfalseMessage(err));
                } else {
                    //update voted list
                    // Docs.mongodb.com. (2018). $push — MongoDB Manual. [online] Available at: 
                    // https://docs.mongodb.com/manual/reference/operator/update/push/#up._S_push [Accessed 9 Sep. 2018].
                    postModel.update(
                        { _id: body._id },
                        { $push: { votedList: body.voterId } }, function (err, respon) {
                            if (err) {
                                callBack(callBackResponse.callbackWithDefaultError(err));
                            }
                            else if (respon == null || respon == undefined) {
                                callBack(callBackResponse.callbackWithfalseMessage('User does not exist'));
                            }
                            else {
                                callBack(callBackResponse.callbackWithSucessMessage('Successfully voted'));
                            }
                        });
                }
            });
        } else {
            callBack(callBackResponse.callbackWithfalseMessage('user already voted'));
        }
    });
};