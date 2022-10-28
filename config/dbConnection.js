const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const dbConnection = (app) => {
  mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/travel-agency",
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
  mongoose.connection.on("connected", () => {
    console.log("Mongoose is connected");
  });
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
};

module.exports = dbConnection;
