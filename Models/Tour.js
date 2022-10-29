const mongoose = require('mongoose');
const validator = require('validator');
const TourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Please add a price'],
    },
    duration: {
        type: Number,
        required: [true, 'Please add a duration']
    },
    maxGroupSize: {
        type: Number,
        required: [true, 'Please add a maxGroupSize']
    },
    tour_guide: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        default: null
    },
    extraInfo: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "ExtraInfo"
        }
    ]
},{timestamps:true});

const Tour = mongoose.model('Tour', TourSchema);
module.exports = Tour;
