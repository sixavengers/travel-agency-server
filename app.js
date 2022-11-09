const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const colors = require('colors');
const cors = require("cors");
const port = process.env.PORT || 5000;
require('dotenv').config()
const dbConnection = require("./config/database");
/* import router */
const userRouter = require("./routes/user.route");
/* ------Package Route------- */
const packageRouter = require("./routes/package.route");
/* ------import error hadeler------- */
const ErrorHandeler = require("./helpers/error.handeler");
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
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`.yellow.bold);
})

/*  users route */
app.use("/api/users", userRouter);
/* -------package route------ */
app.use("/api/package", packageRouter);
/* -------package route------ */
app.all("*", (req, res) => {
    res.send("404 not found")
    })
//------------------->>>>Global Error Handler<<<<------------------- 
app.use(ErrorHandeler)