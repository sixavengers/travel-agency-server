const mongoose = require("mongoose");
const BookedServicesSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    author:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    service: {
        type: mongoose.Types.ObjectId,
        ref: "packages",
    },
    tnxId:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    }

},{
    timestamps: true
})
module.exports.BookedServices = mongoose.model("BookedServices", BookedServicesSchema);