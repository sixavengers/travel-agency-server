const mongoose = require("mongoose");
require("colors");
const databaseConnection = async (app) => {
  const conn = await mongoose.connect(
    process.env.DATABASE_URL || "mongodb://localhost:27017/travel-agency",
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
  console.log(`Database Connected: ${conn.connection.host}`.cyan.underline);
};

module.exports = { databaseConnection };
