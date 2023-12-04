const express = require('express')
const router = express.Router();
const {postCreateDetails, loginuser}=require('../Controller/authController.js')

//CREATE USER
router.post('/signup',postCreateDetails)
//SIGN IN
router.post('/signin',loginuser)
//GOOGLE AUTH
router.post('/google',)

module.exports = router

