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

app.use("/api/v1/auth", require("./routes/auth"));
app.use("/api/v1/users", require("./routes/users"));
app.use("/api/v1/code", require("./routes/code"));
app.use("/api/v1/transactions", require("./routes/transactions"));

app.listen(8000, () => {
  DbConnect();
  console.log("server running");
});

module.exports = app;
