const jwt = require("jsonwebtoken");
require("dotenv").config();
const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token,process.env.secreateKey, (err, decoded) => {
      if (decoded) {
        req.body.owner = decoded.User;
        return next();
      } else {
        return res.send({ msg: "Please login first" });
      }
    });
  } else {
    return res.send({msg:"please login first"}); 
  }
};

module.exports = {
  authenticate
};
