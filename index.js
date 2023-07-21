require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { DbConnect } = require("./helpers/DbConnect");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Home page");
});

app.listen(8000, () => {
  DbConnect();
  console.log("server running");
});

module.exports = app;
