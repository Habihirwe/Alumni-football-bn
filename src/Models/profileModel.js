import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const profileSchema = mongoose.Schema({
    image: {
        type:String
    },
    userName:{
        type:String
        },
    email:{
        type:String 
    },
    gender:{
        type:String
    },
    position:{
        type:String
    },
    occupation:{
        type:String
    },
    phoneNumber:{
        type:String,
    }, 
},{
    timestamps:true
}
)

const Profile= mongoose.model("Profile", profileSchema)
export default Profile;