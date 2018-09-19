//import libraries
'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//create post Schema 
const userSChema = new Schema({
    id: String,
    name: String,
    role: String,
    followers: [{
        id: String,
        name: String,
        role: String     
    }]
}, { timestamps: true });
module.exports = mongoose.model('user', userSChema);