const mongoose = require('mongoose');


const mediaSchema = mongoose.Schema({
    title: { 
        type: String, 
        unique: true, 
        required: true 
    },
    type: { 
        type: String, 
        enum: ['Anime', 'Manga'], 
        required: true 
    },
    rating: { 
        type: Number, 
        min: 1, 
        max: 10, 
        required: true 
    },
    review: { 
        type: String, 
        default: '' 
    }
});

module.exports = mongoose.model('media', mediaSchema);