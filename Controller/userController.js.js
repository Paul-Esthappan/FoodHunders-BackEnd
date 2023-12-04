const user = require("../models/userSchema");
const bcrypt = require('bcrypt');
const video = require("../models/videoSchema");

   


//@dec view details with id
//@route GET /api/user/find:id
//@acess public

const getIdDetails = (req, res, next) => {
    if(req.params.id)
    res.status(202).json({ message: `showing details of id ${req.params.id}` })
}
    ;
//@dec update details with id
//@route PUT /api/user/find:id
//@acess public

const putUpdate = async(req, res, next) => {
    
    console.log("booodyyyyyy",req.body);
    console.log("parrammmms id",req.params.id);
    if (req.body.password) {
        const userdata = await user.findById(req.params.id)
       const isPasswordValid = await bcrypt.compare(req.body.password, userdata.password);
        console.log(req.body.password);
    }
    try {
        const Userupdated = await user.findByIdAndUpdate(req.params.id, {
            $set: 
                req.body
        }, { new: true });
        
        res.status(200).json(Userupdated); 
        console.log("userupdatedata : ",Userupdated);
        }
     catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};


//@dec delete details with id
//@route  /api/user/find:id
//@acess  public

const deleteDetails = async(req, res, next) => {
try {
        await user.findByIdAndDelete(req.params.id)
        res.status(200).json("deleted")
    } catch (error) {
        res.status(500).json(error)
    }
}

//SUBSCRIBE A USER
//@dec SUBSCRIBE
//@route /api/user/subscribe:id
//@acess  public


//add validation or duplate subcription

const subscribeUser = async (req, res, next) => {
    try {
        await user.findByIdAndUpdate(req.user._id, {
            $push: { subscribedUsers: req.params.id }
        });
console.log("reqid in",req.user._id);
        await user.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: 1 }
        });
        console.log("paramid",req.params.id);

        res.status(200).json("Subscription Successful");
    } catch (error) {
        next(error);
    }
};



//UNSUBSCRIBE A USER
//@dec delete details with id
//@route DELETE /api/user/unsubscribe:id
//@acess  public

const unsubscribeUser = async (req, res, next) => {
    try {
        await user.findByIdAndUpdate(req.user._id, {
            $pull: { subscribedUsers: req.params.id }
        });
console.log("reqid in",req.user._id);
        await user.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: -1 }
        });
        console.log("paramid",req.params.id);

        res.status(200).json("Unsubscription Successful");
    } catch (error) {
        next(error);
    }
};



//LIKE A VIDEO
//@dec delete details with id
//@route DELETE /api/like:videoid
//@acess  public

const likeVideo = async(req, res, next) => {
    const id = req.user._id;
    const VideoId = req.user.videoId;
try {
    await video.findByIdAndUpdate(VideoId, {
        $addToSet: { likes: id },
        $pull:{dislikes:id}
    })
    res.status(204).json({message:`Like a vedio`})
} catch (error) {
    next(error)
}
}


//DISLIKE A VEDIO
//@dec delete details with id
//@route DELETE /api/like:videoid
//@acess  public

const disLikeVideo = async(req, res, next) => {
    const id = req.user._id;
    const VideoId = req.user.videoId;
try {
    await video.findByIdAndUpdate(VideoId, {
        $addToSet: { dislikes: id },
        $pull:{likes:id}
    })
    res.status(204).json({message:`dislike a vedio`})
} catch (error) {
    next(error)
}
}
   
module.exports = { getIdDetails, putUpdate, deleteDetails, subscribeUser, unsubscribeUser, likeVideo, disLikeVideo }

