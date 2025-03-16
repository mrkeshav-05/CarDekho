import User from "../models/user.model.js";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const secret = "This#*(%i#s%@c^a(ersatthid>><><dheggefj";

export const ErrorMessage = (status, message) => {
  const error = new Error();
  error.status = status;
  error.message = message;
  return error;
};

export const forgetPassword = async (req, res) => {
  const { email } = req.body;
  console.log(email)
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("User not found");
    }
    const resetToken = jwt.sign({ id: user._id }, "3S1KeYwhichISUn1@u3>>**CArS@@Th1", {
      expiresIn: "15m",
    });
    user.resetToken = resetToken;
    user.resetTokenExpiration = Date.now() + 15 * 60 * 1000; // 15 minutes
    console.log(user)
    await user.save();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      
      auth: {
        user: "gupsahil2005@gmail.com",
        pass: "xqzn aaev tdud grbk",
      },
    });
    const mailOptions = {
      from: "gupsahil2005@gmail.com",
      to: user.email,
      subject: "Password Reset",
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
    Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n
    http://localhost:3000/resetPassword?token=${resetToken}\n\n
    If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
      return res.status(200).json({ message: "Reset token sent to your email", resetToken });
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal server error" });
  }
};

//add reset password
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const password = req.query.password
  console.log('password: ',password)
  try {
    const decoded = jwt.verify(token, "3S1KeYwhichISUn1@u3>>**CArS@@Th1", (err, decode) => {
      if (err) {
        console.log(err);
      } else {
        return decode;
      }
    });
    const id = decoded.id;
    // console.log(id);
    const user = await User.findById(id);
    if (!user) {
      return res.json({ message: "Invalid User" }).status(400);
    }
    // console.log(user)
    // console.log(user.resetToken)
    const resetToken = user.resetToken;
    const resetTokenExpiration = user.resetTokenExpiration;
    if (Date.now() > resetTokenExpiration) {
      return res.json({ message: "Token Expired" }).status(400);
    }
    // console.log("token: ",token);
    // console.log("resetToken: ",resetToken);
    if (token !== resetToken) {
      return res.status(401).send("Invalid token");
    }
    const salt = bcrypt.genSaltSync(10);
    // console.log(req.body);
    const hash = bcrypt.hashSync(password, salt);
    const updateUser = await User.findByIdAndUpdate(id, {
      password: hash,
      resetToken: "hihihi",
      resetTokenExpiration: new Date(),
    });
    return res.json({ message: "Password Updated", updateUser}).status(200);
  } catch (error) {
    console.error("Failed to verify token:", error);
    return res.status(401).send("Invalid toke last walo bhai");
  }
};

export const signup = async (req, res, next) => {
  console.log(req.body)
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const mobno = req.body.phone;
    const existingUserEmail = await User.findOne({ email: req.body.email });
    if (existingUserEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Email is already in use." });
    }
    const existingPhone = await User.findOne({ phone: req.body.phone });
    if (existingPhone) {
      return res
        .status(400)
        .json({ success: false, message: "Phone number is already in use." });
    }
    const existingUsername = await User.findOne({ username: req.body.username });
    if (existingUsername) {
      return res
        .status(400)
        .json({ success: false, message: "Username is already in use." });
    }
    const newUser = new User({ ...req.body, password: hash, phone: mobno });

    const userData = await newUser.save();
    if (userData) {
      sendVerifyMail(req.body.username, req.body.email, userData._id);
      res.status(200).json({ newUser });
    }
  } catch (err) {
    next(err);
    console.log(err);
  }
};

export const verifyMail = async (req, res) => {
  try {
    const updatedInfo = await User.updateOne(
      { _id: req.query.id },
      { $set: { email_verified: true } }
    );

    console.log(updatedInfo);
    res.status(200).json({ message: "email successfully verified" });
  } catch (error) {
    console.log("error is", error.message);
  }
};

//For sending mail
const sendVerifyMail = async (name, email, user_id) => {
  try {
    nodemailer.createTransport({
      service: "gmail", //add gmail service
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: EMAIL,
        pass: PASSWORD, //App password
      },
    });
    const mailOptions = {
      from: EMAIL,
      to: email,
      subject: "CarSaathi Email verification",
      html:
        "<p>Hi" +
        name +
        ', please click here to <a href="http://localhost:3000/verify?id=' +
        user_id +
        '">Verify</a> your email.</p>',
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email has been sent:- ", info.response);
      }
    });
  } catch (err) {
    console.log(err.message);
  }
};