const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan"); // logs incomig requests in terminal
const cors = require("cors");
const app = express();
//models
app.use(cors());
//routes
const routes = require("./Routes/route.js");
app.use(bodyparser.json());
app.use(bodyparser.urlencoded()); //parsing form data
app.use(routes);
app.use("*", (req, res) => {
  res.status(404).send("Not Found ?!");
});
app.use(morgan("tiny"));

app.listen(80, () => {
  console.log("Server Is Running!!");
});
//database connection
mongoose
  .connect("mongodb://127.0.0.1:27017/bookdirectory", {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log(
      'A database with the name "bookdirectory" has been connected !'
    );
  })
  .catch((err) => {
    console.error("Some error occurred", err);
  });

module.exports = app;
