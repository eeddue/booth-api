const jwt = require("jsonwebtoken");

const CreateToken = (userId, expiresIn) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET_TOKEN_KEY, { expiresIn });
};

const VerifyToken = (req, res, next) => {
  const authorization = req.headers["authorization"];
  if (!authorization)
    return res.status(401).json({ msg: "Authorization token is required." });

  const token = authorization.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET_TOKEN_KEY, (error, decoded) => {
    if (error) return res.status(403).json({ msg: "Forbidden" });
    req.userId = decoded.userId;
    next();
  });
};

const CreateCodeToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_TOKEN_KEY);
};

const CheckCodeExpired = (code) => {
  return jwt.verify(code, process.env.JWT_SECRET_TOKEN_KEY);
};

module.exports = {
  CreateToken,
  VerifyToken,
  CreateCodeToken,
  CheckCodeExpired,
};
