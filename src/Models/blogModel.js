import mongoose from "mongoose";

const blogSchema= mongoose.Schema({
    image:{
        type:Object,
        required:true,
    },
    title: {
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
       
    },
},{
    timestamps:true
})

const Blog= mongoose.model("Blog", blogSchema)
export default Blog