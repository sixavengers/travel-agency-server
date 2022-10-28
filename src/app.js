const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./config/database");

app.listen(port, () => console.log(`Listening on port ${port}`));
