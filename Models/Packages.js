const mongoose = require('mongoose');
const validator = require('validator');
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
        package:{type:String,enum:['Family', 'Couple', 'Group', 'Solo']},
        required: [true, 'Please add a packageTypes']
    },
    mealPlan: {
        meal: {type:String,enum:['Breakfast', 'Lunch', 'Dinner', 'Breakfast & Dinner', 'Breakfast & Lunch', 'Lunch & Dinner','none']},
        required: [true, 'Please add a mealPlan'],
    },
    activities: {
        activities: {type:String,enum:['Adventure', 'Cultural', 'Religious', 'Wildlife', 'Beach', 'Hill Station', 'Water Sports','Road Trip','Shopping','family','others']},
        required: [true, 'Please add a activities']   
    },
    duration: {
        type: Date,
        required: [true, 'Please add a Date must be in DD-MM-YR format'],
        validator: [validator.isDate, 'Please add a valid date']    
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
