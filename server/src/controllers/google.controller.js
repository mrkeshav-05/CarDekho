import mongoose from "mongoose";
import User from  "../models/user.model.js"
import bcrypt from "bcryptjs";
import  jwt  from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { validationResult } from "express-validator";

export const googleAuth = async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        res
          .status(200)
          .json(user._doc);
      } else {
        const newUser = new User({
          name:req.body.username,
          ...req.body,
        });
        const savedUser = await newUser.save();
        res
          .status(200)
          .json(savedUser._doc);
      }
    } catch (err) {
      console.log(err);
    }
  };