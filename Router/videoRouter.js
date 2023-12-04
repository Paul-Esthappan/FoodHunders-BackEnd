const express = require('express');
const { verifyTokenandAuthorization, verifyToken } = require('../VerifyToken/verifyToken');
const { addVideo, updateVideo, deleteVideo, getVideo, addView, trendingVideo, randomVideo, subscribedVideo, videoTags, searchVideo } = require('../Controller/videoController');
const router = express.Router();

//CREATE A VIDEO    

router.post('/', verifyToken, addVideo);
router.put('/:id', verifyTokenandAuthorization,verifyToken,updateVideo).delete(verifyTokenandAuthorization,verifyToken,deleteVideo);
router.get('/find:id', getVideo)
router.put('/view/:id',addView)
router.get('/trending',trendingVideo)
router.get('/random', randomVideo)
router.get('/tags', videoTags)
router.get('/search', searchVideo)
router.get('/subscribed',verifyToken,subscribedVideo)
module.exports = router;