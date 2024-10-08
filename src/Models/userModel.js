import mongoose from "mongoose";
const userSchema= mongoose.Schema({

    
    firstname:{
        type:String,
        required:true,
    },
    lastname: {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    // gender:{
    //     type:String,
    //    required:true
    // },
     role:{
        type:String,
        default:"user"
     },
    password: {
        type:String,
        required:true
    },
    repeatPassword:{
        type:String,
        required:true
    },
    dateCreated: {
        type: 'date',
        default: Date.now()
    } 
})

const User  = mongoose.model('User', userSchema)
export default User