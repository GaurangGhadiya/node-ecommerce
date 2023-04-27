
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');
const { userModel } = require("../../models/user");

exports.getUser = async (req, res) => {
  try {
    let { _id } = jwt.verify(
          req.headers?.authorization,
          process.env.JWT_SECRET
        );

        console.log("id",_id)
   if (_id) {
          let userData = await userModel
            .findOne({ _id })
            .select(
              'userName firstName lastName phone email'
            );
            if(userData){
                return res
                .status(200)
                .json({ message: 'User get successfull', data: userData });      
            }else{
                return res.status(400).json({ message: 'User not found' });

            }
          
        } else {
          return res.status(400).json({ message: 'Invalid token' });
        }
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: "Something went wrong", err: err });
  }
};

exports.changePassword = async (req, res) => {
    let {oldPassword, newPassword} = req.body
  try {
    let { _id } = jwt.verify(
        req.headers?.authorization,
        process.env.JWT_SECRET
      );
      let userData = await userModel.findOne({ _id });
      if (userData) {
        var bytes = CryptoJS.AES.decrypt(
          userData.password,
          process.env.AES_SECRET
        );
        var originalText = bytes.toString(CryptoJS.enc.Utf8);
        if (originalText === oldPassword) {
          var ciphertext = CryptoJS.AES.encrypt(
            newPassword,
            process.env.AES_SECRET
          ).toString();
          let updateData = await userModel.findOneAndUpdate(
            { _id },
            { password: ciphertext },
            { new: true }
          );
          if (updateData) {
            return res.status(200).json({
              message: 'Password change successfull',
              data: userData,
            });
          } else {
            return res.status(400).json({ message: 'password not updated' });
          }
        } else {
          return res.status(400).json({ message: 'oldPassword is wrong' });
        }
      } else {
        return res.status(400).json({ message: 'User not found' });
      }
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: "Something went wrong", err: err });
  }
};

exports.updateUser = async (req, res) => {
    console.log("req.headers?.authorization",req.headers?.authorization, process.env.JWT_SECRET)
  try {
    let { _id } = jwt.verify(
        req.headers?.authorization,
        process.env.JWT_SECRET
      );

      let userData = await userModel.findOneAndUpdate({ _id }, req.body, {
        new: true,
      });
      if (userData) {
        return res
          .status(200)
          .json({ message: 'User update successfull', data: userData });
      } else {
        return res.status(400).json({ message: 'Userdata not updated' });
      }
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: "Something went wrong", err: err });
  }
};

exports.deleteUser = async (req, res) => {
    console.log("req.headers?.authorization",req.headers?.authorization, process.env.JWT_SECRET)
  try {
    let { _id } = jwt.verify(
        req.headers?.authorization,
        process.env.JWT_SECRET
      );
      let userData = await userModel.findOneAndDelete({ _id });
      if (userData) {
        return res
          .status(200)
          .json({ message: 'User delete successfull', data: userData });
      } else {
        return res.status(400).json({ message: 'Invalid token' });
      }
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: "Something went wrong", err: err });
  }
};