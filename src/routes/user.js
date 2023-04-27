const { signUp, signIn, forgotPassword, verifyOtp, resetPassword}  = require("../controllers/authentication");
const { getUser, changePassword, updateUser, deleteUser } = require("../controllers/user/profile");
const { signUpValidation, signInValidation, forgotPasswordValidation, verifyOtpValidation, resetPasswordValidation}  = require("../validation/authentication")
const express = require('express');

const router = express.Router()

// Aauthentication
router.post('/signup',signUpValidation, signUp)
router.post('/signin',signInValidation, signIn)
router.post('/forgot-password',forgotPasswordValidation, forgotPassword)
router.post('/varify-otp',verifyOtpValidation, verifyOtp)
router.post('/reset-password',resetPasswordValidation, resetPassword)

// Profile
router.get('/get-user', getUser)
router.post('/change-password', changePassword)
router.put('/update-user', updateUser)
router.delete('/delete-user', deleteUser)


module.exports = router