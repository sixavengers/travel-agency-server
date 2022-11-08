const mongoose = require('mongoose');
// const validator = require('validator');
const PackagesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true,
    },
    origin:{
        type: String,
        required: [true, 'Please add a origin'],
    },
    destination:{
        type: String,
        required: [true, 'Please add a destination'],
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
    isAvailable: {
        type: Boolean,
        default: true
    }
},{timestamps:true});

const Packages = mongoose.model('Packages', PackagesSchema);
module.exports = Packages;
