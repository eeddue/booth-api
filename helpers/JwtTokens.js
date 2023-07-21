const jwt = require("jsonwebtoken");

const CreateToken = (userId, expiresIn) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET_KEY, { expiresIn });
};

const DecodeToken = (token) => {};

module.exports = { CreateToken, DecodeToken };
