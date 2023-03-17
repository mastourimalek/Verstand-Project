const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    // request.body=newUser
    const { firstname, name, email, password, phone } = req.body;
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res
        .status(400)
        .send({ errors: [{ msg: "Email should be unique try again !!!" }] });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    //const newUser
    const newUser = new User({ ...req.body });
    newUser.password = hashedPassword;
    // save
    await newUser.save();
    // creation token
    const token = jwt.sign(
      {
        id: newUser._id,
      },
      process.env.SECRET_KEY,
      { expiresIn: "24H" }
    );
    res
      .status(200)
      .send({ msg: "register successfully..", User: newUser, token });
  } catch (error) {
    res.status(400).send({ errors: [{ msg: "canot register the user !!!" }] });
  }
};
///////////// LOGIN

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check if email exist
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(400).send({ errors: [{ msg: "Bad credential !!!" }] });
    }
    const checkPassword = await bcrypt.compare(password, foundUser.password);
    if (!checkPassword) {
      return res.status(400).send({ errors: [{ msg: "Bad credential !!!" }] });
    }
    // creation token
    const token = jwt.sign(
      {
        id: foundUser._id,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    res
      .status(200)
      .send({ msg: "login successfully..", User: foundUser, token });
  } catch (error) {
    res.status(400).send({ errors: [{ msg: "canot login !!!" }] });
  }
};


//GET ALL USERS

exports.AllUsers = async (req, res) => {
  try {
    const listUsers = await User.find();
    res.status(200).send({ msg: "This is the list of users", listUsers });
  } catch (error) {
    res.status(400).send({ msg: "cannot get all users!!!", error });
  }
};

// GET ONE USER

exports.getOneUser = async (req, res) => {
  const { _id } = req.params;
  try {
    const userToGet = await User.findOne(req.params);
    res.status(200).send({ msg: "get user ", userToGet });
  } catch (error) {
    res.status(400).send({ msg: "fail to get user ", error });
  }
};

/////DELETE USER

exports.deleteUser = async (req, res) => {
  try {
    const { _id } = req.params;
    await User.findOneAndDelete({ _id });
    res.status(200).send({ msg: " user deleted" });
  } catch (error) {
    res
      .status(400)
      .send({ msg: "cannot delete  user with this id !!!", error });
  }
};

// UPDATE INFO

exports.updateInfos = async(req,res) =>{
  try {
      const{_id}= req.params;
      const { firstname , name , email, phone }  = req.body;      

      const updatedUser = await User.findOneAndUpdate(req.params, {$set:{...req.body}})     
      
    
      const updateddUser = new User({...req.body})
    
      const token = jwt.sign({
          id : updatedUser._id,
      },
      process.env.SECRET_KEY,{expiresIn: "72h"}
      )
      
      await updatedUser.save()
      

      res.status(200).send({msg : "Updated successfully..." , user : updatedUser, token })

  } catch (error) {
      res.status(400).send({ errors : [{ msg : "Can not update ... Try again"}]})
  }
}


//UPDATE PASSWORD

exports.updatePassword = async (req, res) => {
  const { oldPassword, password } = req.body;
  const { _id } = req.params;
  try {
    // get user
    const user = await User.findById(req.params);
    if (!user) {
      return res
        .status(400)
        .send({ errors: [{ msg: "User not found" }] });
    }

    // validate old password
    const isValidPassword = await bcrypt.compare(oldPassword, user.password);
    if (!isValidPassword) {
      return res.status(400).send({
        errors: [{ msg: "Verify your old password" }],
      });
    }

    // hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // update user's password
    user.password = hashedPassword;

    const updatedUserPassword = await user.save();

    res.status(200).send({
      success: [{ msg: "Mise à jour avec succés..." }],
      user: updatedUserPassword,
    });
  } catch (error) {
    return res.status(400).send({ errors: [{ msg: "Réessayer plus tard" }] });
  }
};

