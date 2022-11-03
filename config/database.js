const mongoose = require("mongoose");

const databaseConnection = (app) => {
  mongoose.connect(
    process.env.DATABASE_URL || "mongodb://localhost:27017/travel-agency",
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
  mongoose.connection.on("connected", () => {
    console.log("Mongoose is connected");
  });
};

module.exports = { databaseConnection };
