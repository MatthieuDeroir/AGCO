const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true,
        enum: ['image', 'video']
    },
    path: {
        type: String,
        required: true,
        trim: true
    },
    duration: {
        type: Number,
        required: true
    }
});

const Media = mongoose.model('Media', MediaSchema);
module.exports = Media;
