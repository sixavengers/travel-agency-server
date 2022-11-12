const mongoose = require('mongoose');
const validator = require('validator'); 
const PackagesSchema =new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true,
        validate:{
            validator:(value)=>validator.isLength(value,{min:3,max:40}),
            messages:'Name must be between 3 and 40 characters'
        }
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
    },
    mostview:{
        type:Number,
        default:0
    },
    mostexpensive:{
        type:Number,
    },
    mostcheapest:{
        type:Number,
    },
    mostbuy:{
        type:Number,
        default:0
    },
    userbuy:{
       type:Array,
       id:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
       }
    },
    packageLimit:{
        type:Number,
        default:0
    }
},{timestamps:true});
module.exports = mongoose.model('packages', PackagesSchema);

