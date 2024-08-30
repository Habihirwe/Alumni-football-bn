import  { Login, createUser,getsingleUser,getAllUsers,deleteuser } from "../Controllers/userController.js";
import  Express from "express";
import authLogin from "../Midleware/authentication.js";
const userRoute= Express.Router();



userRoute.post('/signup',createUser)
userRoute.post('/login',Login)
userRoute.get('/getSingleUser/:id',getsingleUser)
userRoute.get("/getAllUsers",authLogin,getAllUsers)
userRoute.delete('/deleteuser/:id',deleteuser)



export default userRoute