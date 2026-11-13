const mongoose = require('mongoose');
const media = require("../models/media.js");

let db = {
    
    async connect() {
        try {
            await mongoose.connect('mongodb://127.0.0.1:27017/watchlistDB');
            return "Connected to Mongo DB";
        }
        catch(e) {
            console.log(e.message);
            throw new Error("Error connecting to Mongo DB");
        }
    },

    
    async addMedia(title, type, rating, review) {
        try {
            await media.create({
                title: title,
                type: type,
                rating: rating,
                review: review
            });
            return `Media title: '${title}' has been added`;
        }
        catch(e) {
            console.log(e.message);
            throw new Error(`Media title: '${title}' was not added.`);
        }
    },

};

module.exports = db;