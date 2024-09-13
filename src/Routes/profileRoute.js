import { createProfile } from "../Controllers/profileController.js";
import upload from "../utils/multer.js";
// import authLogin from "../Midleware/authentication.js";

import  Express from "express";
const profileRoute= Express.Router();



profileRoute.post('/createProfile',upload.single('image'), createProfile)

export default profileRoute