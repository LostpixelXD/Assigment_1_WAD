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

    async getAllMedia() {
        try {
            let results = await media.find();
            return results;
        }
        catch(e) {
            console.log(e.message);
            throw new Error("Error retrieving media entries");
        }
    },

    async updateReview(title, rating, review) {
        try {
            let result = await media.findOneAndUpdate(
                { title: title },
                { rating: rating, review: review }
            );
            if (!result) return "Unable to find record to update.";
            else return `Record '${title}' is updated!`;
        }
        catch(e) {
            console.log(e.message);
            throw new Error("Error updating review");
        }
    },

    
    async deleteMediaByTitle(title) {
        try {
            let result = await media.findOneAndDelete({ title: title });
            if (!result) return "Unable to find a record to delete.";
            else return `Record '${title}' is deleted!`;
        }
        catch(e) {
            console.log(e.message);
            throw new Error("Error deleting media item");
        }
    }

};

module.exports = db;