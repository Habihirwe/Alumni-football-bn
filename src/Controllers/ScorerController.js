import Scorer from "../Models/scorers.js";

const createTopScorer= async (req,res)=>{
    try{
        const topScorer= new Scorer({
            name:req.body.name,
            team:req.body.team ,
            scores:req.body.scores
        })
        await topScorer.save();
        console.log(topScorer)
        res.status(201).json({
            status: "success", 
            "successMessage":"top scorer added successfully",
            topScorer: topScorer
        })
    }catch(error){
        console.log(error)
        res.status(500).json(
            { status:"fail",
             error: error
            });
    }
}

const getTopScorers = async(req,res)=>{
    try{
     const topScorers=await Scorer.find()
     return res.status(200).json({
        status:"success",
        "successMessage":"topscorers retrieved successfully",
        "topScorers":topScorers
    })
    }catch(error){
        console.log(error)
        res.status(500).json(
            { status:"fail",
             error: error
            });
    }
}


const deleteTopScorer= async(req,res)=>{
    try{
        const currentTopScorers= await Scorer.findByIdAndDelete(req.params.id);
        res.status(201).json({
            status: "success", 
            "successMessage":"TopScorer deleted successfully",
        });

    }catch(error){
        console.log(error)
        res.status(500).json(
            { status:"fail",
             error: error
            });
    }
}


const updateTopScorer= async(req,res)=>{
    try{
        const {name,team,scores}=req.body;
        const currentTopScorers= await Blog.findById(req.params.id);
        const data={
            name:name|| currentTopScorers.title,
            team:team|| currentTopScorers.content,
            scores:scores|| currentTopScorers.scores
        }
        const updatedTopScorer = await Blog.findByIdAndUpdate(req.params.id, data, { new: true });
        return res.status(201).json({
            status: "success",
            successMessage: "TopScorer updated successfully",
            updatedTopScorer:updatedTopScorer
        });
    }catch(error){

        return res.status(500).json({
            status: "fail",
            error: error.message,
        });
    }
}
export {createTopScorer,getTopScorers,deleteTopScorer,updateTopScorer}