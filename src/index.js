const app = require("./app");
const port = process.env.PORT || 5000;




// listen port
app.listen(port, () => console.log(`Listening on port ${port}`));



/* Global Error Handle */
app.use((req, res, next) => {
  res.status(422).send({ error: "No route found" });
});

app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
  console.log(err);
  if (req.headersSent) {
    return next(err);
  }
});

process.on("unhandledRejection", (reason, p) => {
  console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
  // application specific logging, throwing an error, or other logic here
  if (reason) {
    console.log(`Logged Error: ${reason}`);
    app.close(() => process.exit(1));
  }
});
