const bcrypt = require("bcryptjs");

const Encrypt = (data) => {
  return bcrypt.hashSync(data, 10);
};

const Compare = (a, b) => {
  return bcrypt.compareSync(a, b);
};

module.exports = { Encrypt, Compare };
