import cloudinary from "../utils/claudinary.js"; 
import Blog from "../Models/blogModel.js";
const createPost = async (req, res) => {
    try {
        const postImageResult = await cloudinary.uploader.upload(req.file.path);
        const data = new Blog({
            title: req.body.title,
            content: req.body.content,
            createdBy: req.user._id,
            image: postImageResult.secure_url,
        });
        const blog = await data.save();
        return res.status(201).json({
            status: "success",
            successMessage: "Blog created successfully",
            blog: blog,
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: "fail",
            error: error.message,
        });
    }
};

const getAllBlogs= async (req,res)=>{
try{
    const blogs= await Blog.find().sort({createdAt:-1}).populate('createdBy', 'name')
    return res.status(201).json({
        status: "success",
        successMessage: "Blog retrieved successfully",
        blog: blogs,
    });


}catch(error){
    return res.status(500).json({
        status: "fail",
        error: error.message,
    });

}

}

const getSingleBlog =async(req,res)=>{
    try{
        const blog = await Blog.findById(req.params.id).populate('comments.created', 'name');
        return res.status(201).json({
            status: "success",
            successMessage: "Blog retrieved successfully",
            blog: blog,
        });
    }catch(error){
        return res.status(500).json({
            status: "fail",
            error: error.message,
        });
    

    }
}

const deleteblog = async (req, res) => {
    const currentPost = await Blog.findById(req.params.id);     
    const ImgId = currentPost.image.public_id;
    if (ImgId) {
        await cloudinary.uploader.destroy(ImgId);
    }

    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        return res.status(201).json({
            status: "success",
            successMessage: "Blog deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            status: "fail",
            error: error.message,
        });
    }

}

const updateBlog= async(req,res)=>{
    try{
        const {title,content,image}=req.body;
        const currentBlog= await Blog.findById(req.params.id);
        const data={
            title:title|| currentBlog.title,
            content:content|| currentBlog.content,
            image:image|| currentBlog.image
        }
        if (req.body.image!=" "){
            const currentId=  currentBlog.image.public_id;
            if (currentId) {
                await cloudinary.uploader.destroy(currentId);
            }

            const newImage = await cloudinary.uploader.upload(req.file.path);
            data.image = newImage.secure_url
        }
        const updateBlog = await Blog.findByIdAndUpdate(req.params.id, data, { new: true });
        return res.status(201).json({
            status: "success",
            successMessage: "Blog updated successfully",
            blog:updateBlog
        });
    }catch(error){

        return res.status(500).json({
            status: "fail",
            error: error.message,
        });
    }
}

const addComment= async (req,res)=>{
    const {comment}=req.body
    try{
        const blogcomment= await Blog.findByIdAndUpdate(req.params.id,{
            $push:{comments:{ text: comment, createdBy: req.user._id }}
        } ,
        { new: true }
    )
    const post = await Blog.findById(blogcomment._id).populate('comments.createdBy', 'name email')
    return res.status(201).json({
        status: "success",
        successMessage: "Blog updated successfully",
        comment:blogcomment
    });

    }catch(error){
        return res.status(500).json({
            status: "fail",
            error: error.message,
        });

    }
}

const addLike= async(req,res)=>{
    try{
        const blog = await Blog.findByIdAndUpdate(re.params.id,
           { $addToSet: { likes: req.user._id }},
           {new:true}
        )
        const posts = await Blog.find().sort({ createdAt: -1 }).populate('postedBy', 'name');
    }catch(error){

    }
}
export { createPost,getAllBlogs,getSingleBlog,deleteblog,updateBlog,addComment};

