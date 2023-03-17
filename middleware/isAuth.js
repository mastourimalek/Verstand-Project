const jwt = require("jsonwebtoken");
const User = require("../models/User");

const isAuth = async (req, res, next) => {
  try {
    // token = headers
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(401).send({ errors: [{ msg: "Not authorized !!" }] });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const foundUser = await User.findOne({ _id: decoded.id });
    if (!foundUser) {
      return res.status(401).send({ errors: [{ msg: "Not authorized !!!" }] });
    }
    req.user = foundUser;
    next();
  } catch (error) {
    return res.status(401).send({ errors: [{ msg: "Not authorized !!!!" }] });
  }
};

module.exports = isAuth;
