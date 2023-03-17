const express = require("express");
const {
  registerAdmin,
  loginAdmin,
  getOneAdmin,
  updatePasswordAdmin,
  updateAdminInfos,
} = require("../controllers/admin");

const isAuthAdmin = require("../middleware/isAuthAdmin");
const {
  validation,
  registerValidationAdmin,
  loginValidationAdmin,
  editPasswordValidator,
  editInfosValidator,
} = require("../middleware/validator");

// 2  express router
const router = express.Router();

// Routes user (register& login)

// register
router.post(
  "/registerAdmin",
  registerValidationAdmin(),
  validation,
  registerAdmin
);
// login
router.post("/loginAdmin", loginValidationAdmin(), validation, loginAdmin);

// current user
router.get("/currentAdmin", isAuthAdmin, (req, res) => {
  res.send(req.admin);
});

// get one admin
router.get("/one/:_id", getOneAdmin);



// UPDATE
router.put("/edit/:_id", isAuthAdmin, updateAdminInfos);

router.put("/password/:_id", isAuthAdmin, updatePasswordAdmin);

// export
module.exports = router;
