const { check, validationResult } = require("express-validator");

// user part !!

exports.registerValidation = () => [
  check("name", "name is required !!!").not().isEmpty(),
  check("email", "enter a valid email !!!").isEmail(),
  check("password", "enter a valid password !!!").isLength({ min: 6 }),
];

exports.loginValidation = () => [
  check("email", "enter a valid email !!!").isEmail(),
  check("password", "enter a valid password !!!").isLength({ min: 6 }),
];

// Admin part !!

exports.registerValidationAdmin = () => [
  check("name", "name is required !!!").not().isEmpty(),
  check("email", "enter a valid email !!!").isEmail(),
  check("password", "enter a valid password !!!").isLength({ min: 6 }),
];

exports.loginValidationAdmin = () => [
  check("email", "enter a valid email !!!").isEmail(),
  check("password", "enter a valid password !!!").isLength({ min: 6 }),
];


//common part !!

exports.validation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

exports.editInfosValidator = () => [
  check("email", "enter a valid email !!!").isEmail(),
];

exports.editPasswordValidator = () => [
  check("password", "enter a valid password !!!").isLength({ min: 6 })
];