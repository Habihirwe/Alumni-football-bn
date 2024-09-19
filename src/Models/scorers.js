
import mongoose from "mongoose";
const scorerSchema = mongoose.Schema({
    name:{
        type:String,
        required:true

    },
    team:{
        type:String,
        required:true
    },
    scores:{
        type:Number,
        required:true
    }, 
},{
    timestamps:true
}
)

const Scorer= mongoose.model("Scorer", scorerSchema)
export default Scorer;