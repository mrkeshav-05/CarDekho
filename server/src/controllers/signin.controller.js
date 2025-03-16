import User from  "../models/user.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const secret = "This#*(%i#s%@c^a(ersatthid>><><dheggefj";

export const signin = async (req, res, next) => {

    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) res.status(500).json({message:"Email not Found"});
      else{
        const isCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isCorrect) {res.status(500).json({ message: "Incorrect password" });}
        else{
          const accesstoken = jwt.sign({id:user._id,email:user.email,username:user.username},secret,{expiresIn:"15m"})
          const { password, ...others } = user._doc;
        res
        .status(200)
        .json({others,accesstoken})
        }
      }
    } catch (err) {
      console.log(err);
    }
  };