import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;
const { Schema } = mongoose;

const blogSchema= mongoose.Schema({
    image: {
        type:String
    },
    title: {
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true,
    },  
    createdBy:{type: Schema.Types.ObjectId, ref:"User", required:true},
    likes: [{ type: ObjectId, ref: "User" }],
        comments: [
            {
                text: String,
                created: { type: Date, default: Date.now },
                createdBy: {
                    type: Schema.Types.ObjectId,
                    ref: "User",
                },
            },
        ],

    
},{
    timestamps:true
})

const Blog= mongoose.model("Blog", blogSchema)
export default Blog