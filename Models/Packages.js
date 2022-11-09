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
    packageClassess: {
        type: String,
        required: [true, 'Please add a packageClassess'],
        enum: ['Luxury', 'Mid Range', 'Budget'],
    },
    packageTypes:{
        type: String,
        required: [true, 'Please add a packageTypes'],
        enum: ['Family', 'Couple', 'Group', 'Solo'],

    },
    mealPlan: {
        type: String,
        required: [true, 'Please add a mealPlan'],
        enum: ['Breakfast', 'Lunch', 'Dinner', 'Breakfast & Dinner', 'Breakfast & Lunch', 'Lunch & Dinner']
    },
    activities: {
        type: String,
        required: [true, 'Please add a activities'],
        enum: ['Adventure', 'Cultural', 'Religious', 'Wildlife', 'Beach', 'Hill Station', 'Water Sports','Road Trip','Shopping','family','others']   
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
    },
    ratingsAverage: {
        type: Number,
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be below 5.0'],
    }
},{timestamps:true});

const Packages = mongoose.model('Packages', PackagesSchema);
module.exports = Packages;
