import mongoose from "mongoose";
const { Schema } = mongoose;

const blogSchema= mongoose.Schema({
    image:{
        type:Object,
        required:true,
    },
    title: {
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    likes:[{ type: Schema.Types.ObjectId, ref:'User'}],
    comments:[{
        text:String,
        created:{type:Date, default:Date.now},
        postedBy:{
            type:Schema.Types.ObjectId,
            ref:'User'
        }
    }]

    
},{
    timestamps:true
})

const Blog= mongoose.model("Blog", blogSchema)
export default Blog