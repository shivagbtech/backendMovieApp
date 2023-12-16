import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

export const authentication = async (req, res, next) => {
  try {
    const { verify } = jwt;
    // const token = req.headers.authorization.replace("Bearer", "").trim();
    let token = req.headers.authorization;

    // if(token===undefined || token === null){

    //   token = req.body.headers.Authorization.replace("token ", "");
    // }
    // console.log('token',req.body.headers.Authorization);
    // console.log('req',req);
    const user = verify(token, process.env.jwtkey);

    if (!user) return res.status(404).json({ message: "something went wrong" });

    // console.log(user);
    req.user = await userModel.findOne({ _id: user._id });
    next();
  } catch (err) {
    res.status(404).json({ message: "invalid token" });
  }
};
