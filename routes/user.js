// 1 require express
const express = require("express");
const { register, login, deleteUser,  getOneUser, updateInfos, updatePassword, AllUsers } = require("../controllers/user");
const isAuth = require("../middleware/isAuth");
const {
  registerValidation,
  validation,
  loginValidation,
  editPasswordValidator,
  editInfosValidator,
  
} = require("../middleware/validator");

// 2  express router
const router = express.Router();

// Routes user (register& login)

// register
router.post("/register", registerValidation(), validation, register);
// login
router.post("/login", loginValidation(), validation, login);

// current user
router.get("/current", isAuth, (req, res) => {
  res.send(req.user);
});

// get all users
router.get("/AllUsers", AllUsers);

// get one user
router.get('/:_id',getOneUser) ;
// Delete user
router.delete("/:_id",deleteUser);

// UPDATE
router.put('/edit/:_id', isAuth,editInfosValidator() , updateInfos) 

router.put('/password/:_id', isAuth,editPasswordValidator() , updatePassword ) 


// export
module.exports = router;
