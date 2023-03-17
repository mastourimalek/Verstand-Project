const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const isAuthAdmin = async (req, res, next) => {
  try {
    // token = headers
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(401).send({ errors: [{ msg: "Not authorized 1 !!" }] });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const foundAdmin = await Admin.findOne({ _id: decoded.id });
    if (!foundAdmin) {
      return res
        .status(401)
        .send({ errors: [{ msg: "Not authorized 2 !!!" }] });
    }
    req.admin = foundAdmin;
    next();
  } catch (error) {
    return res.status(401).send({ errors: [{ msg: "Not authorized 3 !!!!" }] });
  }
};

module.exports = isAuthAdmin;
