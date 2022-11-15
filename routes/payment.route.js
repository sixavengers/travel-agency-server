const route = require('express').Router();
const authUser = require("../middeware/authVerify")
const payment = require('../controllers/payment.controler');
route.post('/create-payment-intent',authUser,payment.createPaymentIntent);

module.exports = route;