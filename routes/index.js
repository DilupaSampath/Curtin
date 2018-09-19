'use strict'
//Import Express
const express = require('express');
//user router
const router = express.Router();
//Import body parser
const bodyParser = require('body-parser');

// router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

//import contralers - randima
const postContraller = require('../src/posts/postContraller');
const userContraller = require('../src/users/userContraller');

//import contralers - hasini
const ctrlUser = require('../controllers/user.controller');
const jwtHelper = require('../config/jwtHelper');


//randima routes
//post routes
router.route('/api/user/new').post(userContraller.addUser);
router.route('/api/user/follower').post(userContraller.addFollower);
router.route('/api/user/find').post(userContraller.findUser);
router.route('/api/post/byType').post(postContraller.getPost);
router.route('/api/post/voteAdd').post(postContraller.makeVote);

//user routs

//hasini routes
router.post('/api/register', ctrlUser.register);
router.post('/api/authenticate', ctrlUser.authenticate);
router.get('/api/userProfile', jwtHelper.verifyJwtToken, ctrlUser.userProfile);


module.exports = router;