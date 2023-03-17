const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerAdmin = async (req, res) => {
  try {
    // request.body=newUser
    const { firstname, name,email, password,isAdmin } = req.body;
    const foundAdmin = await Admin.findOne({ email });
    if (foundAdmin) {
      return res
        .status(400)
        .send({ errors: [{ msg: "email ... try again !!!" }] });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    //const newUser
    const newAdmin = new Admin({ ...req.body });
    newAdmin.password = hashedPassword;
    // save
    await newAdmin.save();
    // creation token
    const token = jwt.sign(
      {
        id: newAdmin._id,
      },
      process.env.SECRET_KEY,
      { expiresIn: "144h" }
    );
    res.status(200).send({
      success: [{ msg: "Register successfully..." }],
      admin: newAdmin,
      token,
    });
  } catch (error) {
    res.status(400).send({ errors: [{ msg: "canot register ...!!!" }] });
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check if email exist
    const foundAdmin = await Admin.findOne({ email });
    if (!foundAdmin) {
      return res.status(400).send({ errors: [{ msg: "Bad credential !!!" }] });
    }
    const checkPassword = await bcrypt.compare(password, foundAdmin.password);
    if (!checkPassword) {
      return res.status(400).send({ errors: [{ msg: "Bad credential !!!" }] });
    }
    // creation token
    const token = jwt.sign(
      {
        id: foundAdmin._id,
      },
      process.env.SECRET_KEY,
      { expiresIn: "144h" }
    );
    res
      .status(200)
      .send({ msg: "login successfully..", Admin: foundAdmin, token });
  } catch (error) {
    res.status(400).send({ errors: [{ msg: "canot login !!!" }] });
  }
};

// GET ONE ADMIN

exports.getOneAdmin = async (req, res) => {
  const { _id } = req.params;
  try {
    const adminToGet = await Admin.findOne(req.params);
    res.status(200).send({ msg: "get admin ", adminToGet });
  } catch (error) {
    res.status(400).send({ msg: "fail to get admin ", error });
  }
};

// UPDATE INFO
exports.updateAdminInfos = async(req,res) =>{
  try {
      const{_id}= req.params;
      const { firstname , name , email }  = req.body;      

      const updatedAdmin = await Admin.findOneAndUpdate(req.params, {$set:{...req.body}})     
      
    
      const updateddAdmin = new Admin({...req.body})
    
      const token = jwt.sign({
          id : updatedAdmin._id,
      },
      process.env.SECRET_KEY,{expiresIn: "72h"}
      )
      
      await updatedAdmin.save()
      

      res.status(200).send({msg : "Updated successfully..." , admin : updatedAdmin, token })

  } catch (error) {
      res.status(400).send({ errors : [{ msg : "Can not update ... Try again"}]})
  }
}

exports.updatePasswordAdmin = async (req, res) => {
  const { oldPassword, password } = req.body;
  const { _id } = req.params;
  try {
    // get admin
    const admin = await Admin.findById(req.params);
    if (!admin) {
      return res
        .status(400)
        .send({ errors: [{ msg: "Admin non trouvé" }] });
    }

    // validate old password
    const isValidPassword = await bcrypt.compare(oldPassword, admin.password);
    if (!isValidPassword) {
      return res.status(400).send({
        errors: [{ msg: "Veuillez vérifier votre ancien mot de passe" }],
      });
    }

    // hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // update admin's password
    admin.password = hashedPassword;

    const updatedAdminPassword = await admin.save();

    res.status(200).send({
      success: [{ msg: "Mise à jour avec succés..." }],
      admin: updatedAdminPassword,
    });
  } catch (error) {
    return res.status(400).send({ errors: [{ msg: "Réessayer plus tard" }] });
  }
};

