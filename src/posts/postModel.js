//import libraries
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//create post Schema 
const postSchema = new Schema({
    id: String,
    user: String,
    title: String,
    body: String,
    vots: Number,
    votedList: [
        {
            id: String
        }
    ]
}, { timestamps: true });
console.log("ok");
module.exports = mongoose.model('Posts', postSchema);