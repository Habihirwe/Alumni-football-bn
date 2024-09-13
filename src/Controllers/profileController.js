import Profile from "../Models/profileModel.js";
import cloudinary from "../utils/claudinary.js"; 

const createProfile = async (req, res) => {
    try {
        const postImageResult = await cloudinary.uploader.upload(req.file.path);
        const data = new Profile({
            userName: req.body.userName,
            gender: req.body.gender,
            email: req.body.email,
            position: req.body.position,
            occupation:req.body.occupation,
            phoneNumber:req.body.phoneNumber,
            image: postImageResult.secure_url,
        });
        const profile = await data.save();
        return res.status(201).json({
            status: "success",
            successMessage: "Profile created successfully",
            profile: profile,
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: "fail",
            error: error.message,
        });
    }
};

export {createProfile}