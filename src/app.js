const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConnection = require("../config/database");


// apply middle wares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());


// Connect to Database
dbConnection.databaseConnection();



/* Test Routes */
app.get("/", (req, res) => {
    res.send({success: true, message: "Welcome to the TRAVEL AGENCY API"});
});

/* import router */
const userRouter = require("./../routes/user.route");
/*  users route */
app.use("/api/users", userRouter);










module.exports = app;