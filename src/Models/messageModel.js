import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const messageSchema = mongoose.Schema({
    email:{
        type:String
    },
    phoneNumber:{
        type:String
    },
    content:{
        type:String,
        required:true
    }, 
},{
    timestamps:true
}
)

const Message= mongoose.model("Message", messageSchema)
export default Message;