import Message from "../Models/messageModel.js"

const createMessage =async (req,res)=>{
    try{
        const data= new Message({
            name:req.body.name,
            email:req.body.email,
            content:req.body.content,
            phoneNumber:req.body.phoneNumber
    
        })
        const message = await data.save()
        console.log(message)
        res.status(201).json({
            status: "success", 
            "successMessage":"message created successfully",
            Message: message});

    }catch(error){
        res.status(500).json(
            { status:"fail",
             error: error
            });
    }

}

const getAllMessage= async(re,res)=>{
    try{
        const message= await Message.find()
        res.status(201).json({
            status: "success", 
            "successMessage":"message retrieved successfully",
            Message: message});


    }catch(error){
        res.status(500).json(
            { status:"fail",
             error: error
            });
    }

    }

    const deleteMessage= async(req,res)=>{
        try{
            const currentMessage= await Message.findByIdAndDelete(req.params.id);
            res.status(201).json({
                status: "success", 
                "successMessage":"message deleted successfully",
            });

        }catch(error){
            res.status(500).json(
                { status:"fail",
                 error: err
                });
        }
    }
export {createMessage,getAllMessage,deleteMessage}