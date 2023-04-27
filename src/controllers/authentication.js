const { userModel } = require("../models/user");
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

exports.signUp = async (req, res) => {
  try {
    let user = await userModel.findOne({ email: req.body?.email });
    if (user) {
      return res.status(400).json({ message: "user already found", data: {} });
    } else {
      var ciphertext = CryptoJS.AES.encrypt(
        req.body?.password,
        process.env.AES_SECRET
      ).toString();

      var userData = new userModel({
        password: ciphertext,
        userName: req.body?.userName,
        firstName: req.body?.firstName,
        lastName: req.body?.lastName,
        phone: req.body?.phone,
        email: req.body?.email,
      });
      let data = await userData.save();
      console.log("data", data);
      if (data)
        return res
          .status(200)
          .json({ message: "Sign Up Successfully", data: data });
    }
  } catch (e) {
    console.log("err", e);
    return res.status(400).json({ message: e?.message, data: {} });
  }
};

exports.signIn = async (req, res) => {
  try {
    let userData = await userModel
      .findOne({ email: req.body.email })
      .select("email password");
    if (userData) {
      console.log("userData", userData);
      var bytes = CryptoJS.AES.decrypt(
        userData.password,
        process.env.AES_SECRET
      );
      var originalText = bytes.toString(CryptoJS.enc.Utf8);
      if (
        req.body.email == userData.email &&
        req.body.password == originalText
      ) {
        console.log("userData",userData)
        var token = jwt.sign(userData.toJSON(), process.env.JWT_SECRET);
        console.log("token",token)
        let response = {
          token,
          id: userData?._id,
          userName: userData?.userName,
          email: userData?.email,
        };
        return res
          .status(200)
          .json({ message: "Sign in Successfully", data: response });
      } else {
        return res.status(400).json({ message: "invalid credential" });
      }
    } else {
      return res.status(400).json({ error: "user not found" });
    }
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: "Something went wrong", err: err });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    let isAlready = await userModel.findOne(req.body).select("email");
    if (isAlready) {
      let newOtp = await userModel.findOneAndUpdate(
        req.body,
        { otp: Math.floor(100000 + Math.random() * 900000) },
        { new: true }
      );
      console.log("newOtp", newOtp);
      if (newOtp) {
        let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASSWORD,
          },
        });

        let info = {
          from: process.env.NODEMAILER_EMAIL, // sender address
          to: req.body?.email, // list of receivers
          subject: "Forgot Password", // Subject line
          text: `Forgot Password OTP :- ${newOtp?.otp}`, // plain text body
          // html: "<b>Borobazar</b>", // html body
        };

        transporter.sendMail(info, (err) => {
          if (err) {
            return res
              .status(400)
              .json({ data: err, message: "Please enter valid email" });
          } else {
            return res
              .status(200)
              .json({ data: isAlready, message: "Email send sucessfull" });
          }
        });
      } else {
        return res.status(400).json({ message: "OTP not generated" });
      }
    } else {
      return res.status(400).json({ message: "User not found wih this email" });
    }
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: "Something went wrong", err: err });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    let isAlready = await userModel.findOne(req.body);
    if (isAlready) {
      let response = {
        userName: isAlready?.userName,
        email: isAlready?.email,
        id: isAlready?.id,
      };

      return res
        .status(200)
        .json({ message: "OTP Verify Successfully", data: response });
    } else {
      return res.status(400).json({ message: "Invalid OTP" });
    }
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: "Something went wrong", err: err });
  }
};
exports.resetPassword = async (req, res) => {
  try {
    var ciphertext = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.AES_SECRET
      ).toString();
      let isAlready = await userModel
        .findOneAndUpdate(
          { _id: req.body?.id },
          { password: ciphertext },
          { new: true }
        )
        .select('email name ');
      if (isAlready) {
        return res
          .status(200)
          .json({ message: 'Successfull change', data: isAlready });
      } else {
        return res.status(400).json({ message: 'User not found' });
      }
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: "Something went wrong", err: err });
  }
};
