require("dotenv").config();

const express = require("express");
const cors = require("cors");

const DbConnect = require("./helpers/DbConnect");
const { VerifyToken } = require("./helpers/Jwt");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send(
    "BOOTH - Send, receive and withdraw money from anywhere in the world."
  );
});

app.get("/api/v1/auth/invite", (req, res) => {
  res.send("invite");
});

app.use("/api/v1/auth", require("./routes/auth"));
app.use("/api/v1/code", require("./routes/code"));
app.use("/api/v1/users", VerifyToken, require("./routes/users"));
app.use("/api/v1/transactions", VerifyToken, require("./routes/transactions"));

app.listen(8000, () => {
  DbConnect();
  console.log("server running");
});

module.exports = app;
