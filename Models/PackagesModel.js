const mongoose = require('mongoose');
const validator = require('validator'); 
const PackagesSchema =new mongoose.Schema({
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
            type:Array,
            required: [true, 'Please add a packageTypes'],  
        }
    ,
    mealPlan: {
        type: Array,
        required: [true, 'Please add mealPlan'],
    },
    activities: {
        type:Array,
        required: [true, 'Please add activities']   
    },
    jurneyDate:{
        type: String,
        required: [true, 'Please add a jurneyDate'],
        default: new Date().toJSON().slice(0,10).replace(/-/g,'/')
    },
    returnDate:{
        type: String,
        required: [true, 'Please add a returnDate'],
    },
    maxGroupSize: {
        type: Number,
        required: [true, 'Please add a maxGroupSize']
    },
    createBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
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
module.exports = mongoose.model('packages', PackagesSchema);

