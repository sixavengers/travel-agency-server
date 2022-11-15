const User = require('../Models/User');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const createPaymentIntent = async (req, res) => {
      try {
        const id = req.userData.id
        const user = await User.findById(id);
        if(user.role!=="user"){
            return res.status(400).json({ messages: "You are not a user" });
        }
        const {  price} = req.body;
        const amount = price * 100;
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
            payment_method_types: ['card'],
        })
        res.status(200).json({
            clientSecret: paymentIntent.client_secret,
            success: true,
            message: "Payment Intent Created"
        })
      } catch (error) {
        res.status(500).send({ success: false, messages: error?.message });
      }
}
module.exports = {createPaymentIntent}