import jwt from "jsonwebtoken";

const { verify } = jwt;
import userModel from "../models/user.model.js";

export const authentication = async (req, res, next) => {

  try{
    const token = req.headers.authorization.replace("Bearer", "").trim();
  
    // console.log("authorization here",token);

    
  
    const user = verify(token, process.env.jwtkey);
  
    if (!user) return res.status(404).json({ message: "something went wrong" });
  
    req.user = await userModel.findOne({ _id: user._id });
    next();

  }catch(err){
    console.log(err);
    res.status(404).json({ message: "invalid token" });
  }
};
