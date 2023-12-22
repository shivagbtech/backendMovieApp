import userModel from "../../models/user.model.js";
// import pkg from "jsonwebtoken";
// const {jwt} =pkg
import jwt from "jsonwebtoken";
const { sign, verify } = jwt;
import bcrypt from 'bcrypt'

export const getLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "user does not exist" });
  } else {
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "internal server error" });
      }

      if (!result) {
        return res.status(404).json({ message: "password does not match" });
      }
      const token = sign(
        { _id: user._id, isadmin: user.isadmin },
        process.env.jwtkey
      );
      res.json({ token: token, isadmin: user.isadmin });
    });
  }

  
};


export const createUser = async (req, res) => {
  const { name, email, password, isadmin } = req.body;

  const existingUserQuery = {
    email,
  };

  const userInstance = await userModel.findOne(existingUserQuery);

  console.log("userInstance", userInstance);

  if (userInstance !== null) {
    return res.status(404).json({ message: "User already exist" });
  }

  // creating a hashed password

  const hashedPassword = await bcrypt
    .genSalt(10)
    .then((salt) => {
      // console.log("Salt: ", salt);
      return bcrypt.hash(password, salt);
    })
    .then((hash) => {
      return hash;
    })
    .catch((err) => console.error(err.message));

  // check for hashed password
  if (hashedPassword === null) {
    return res.status(404).json({ message: "Something wrong in the password" });
  }

  // console.log("hashhed", hashedPassword);

  // Newly user
  const createUserInstanceQueryPayload = {
    name,
    email,
    password: hashedPassword,
    isadmin,
  };

  // console.log("createUserInstanceQueryPayload", createUserInstanceQueryPayload);

  const user = await userModel.create(createUserInstanceQueryPayload);

  res.status(200).json({
    success: true,
    message: "Successfully created user",
    result: user,
  });
};

export const getAllUser=async (req,res,next)=>{

  let allUser;
  if(req.user.isadmin){
    allUser=await userModel.find();

    res.json({message:'successful',allUser:allUser})
  }else{
    res.state(404).json({message:'you are not authorized to get all user'})
  }
}
