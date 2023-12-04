const express = require('express');
const { getIdDetails, putUpdate, deleteDetails,subscribeUser, unsubscribeUser, likeVideo, disLikeVideo  } = require('../Controller/userController.js');
const { verifyToken, verifyTokenandAuthorization } = require('../VerifyToken/verifyToken.js');
const router = express.Router();

//GET USER
//UPDATE USER
//DELETE USER
router.route('/find/:id').get(getIdDetails).put(verifyTokenandAuthorization,verifyToken, putUpdate).delete(verifyTokenandAuthorization,verifyToken,deleteDetails)

//SUBSCRIBE A USER
router.route('/subscribe/:id').put(verifyToken, subscribeUser)

//UNSUBSCRIBE A USER
router.route('/unsubscribe/:id').put(verifyToken,unsubscribeUser)

//LIKE A VIDEO
router.route('/like/:videoid').put(verifyToken,likeVideo)

//DISLIKE A VEDIO
router.route('/dislike/:videoid').put(verifyToken,disLikeVideo)



//RECOMMEND A SPOT

//NOT RECOMMEND A SPOT


//WORTH SPOT

//NOT WORTH SPOT

//TASTE SPOT

//NO TASTE SPOT

//GOOD SERVICE

//BAD SERVICE




module.exports = router