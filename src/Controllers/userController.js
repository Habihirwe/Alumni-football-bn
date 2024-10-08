import User from "../Models/userModel.js";
import userValidationSchema from "../validations/userValidation.js";
import bcrypt from 'bcrypt'
import  Jwt  from "jsonwebtoken";


const createUser= async(req,res)=>{
    const {error} = userValidationSchema.validate(req.body)
    if (error)
        return res.status(400).json({"validationError": error.details[0].message})

    const duplicatedEmail = await User.findOne({email: req.body.email})

    if (duplicatedEmail)
        return res.status(409).json({"message": `A user with email ${req.body.email} already exist!`})

    try{
        const salt = await bcrypt.genSalt(10)
        const hashedpassword=await bcrypt.hash(req.body.password,salt)
        const hashedrepeatpassword= await bcrypt.hash(req.body.repeatPassword,salt)


        const user= new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email:req.body.email,
            role:req.body.role,
            // gender:req.body.gender,
            password: hashedpassword,
            repeatPassword: hashedrepeatpassword

        })
        await user.save();
        console.log(user)
        res.status(201).json({
            status: "success", 
            "successMessage":"account created successfully",
            user: user
            
        });

    }catch(err){
        console.log(err)
        res.status(500).json(
            { status:"fail",
             error: err
            });

    }

}

const Login =async(req,res)=>{
    try{
    const user= await User.findOne({email:req.body.email})
    if(!user){

        return res.status(400).json({
            status:"fail",
            "InvalidCredentials":"Invalid email or password"
        })
    }
    const isPasswordValid= await bcrypt.compare(req.body.password, user.password)
    if(!isPasswordValid){
        return res.status(400).json({
            status:"failed",
            "InvalidCredentials":"Invalid email or password"
        });

    }
    const token = Jwt.sign(
        { data: { _id: user._id, name: user.lastname, email: user.email } }, 
        process.env.JWT_SECRET, 
        { expiresIn: '48h' }
    );
res.header("auth_token", token)
return res.status(201).json({
    status:"success",
    "successMessage":"LoggedIn successfully!", "token": token
})
    }catch(err){
        return res.status(500).json(err.message);
        
    }  
} 
const getsingleUser= async(req,res)=>{
    try{
        const singleUser= await User.findById(req.params.id)
        if(!singleUser){
            return res.status(404).json({
                status:"fail",
                message:"user not found!!!"
            })
        }
        return res.status(200).json({
            status:'sucessss',
            data:singleUser
        })

    }catch(err){
       return  res.status(500).json({
            error:err,
        })

    }
}

const getAllUsers= async (req,res)=>{
    try{
        const users= await User.find();
        return res.status(200).json({
            status:"success",
            "allusers":users
        })
    }catch(err){
        return res.status(500).json({
            status:"fail",
            error:err.message
        })
    }
}

const deleteuser= async(req,res)=>{
    try{
        const currentMessage= await User.findByIdAndDelete(req.params.id);
        res.status(201).json({
            status: "success", 
            "successMessage":"user deleted successfully",
        });

    }catch(error){
        console.log(error)
        res.status(500).json(
            { status:"fail",
             error: error
            });
    }
}

const logout= async(req,res)=>{
    try{
        res.c

    }catch(error){

    }
}
export { createUser, Login ,getsingleUser,getAllUsers,deleteuser }