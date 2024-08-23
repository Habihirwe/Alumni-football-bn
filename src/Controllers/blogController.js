import Blog from "../Models/blogModel.js";
import cloudinary from "../utils/claudinary.js";
import blogValidationSChema from "../validations/blogValidation.js";

const createBlog = async (req, res) => {
  const { error } = blogValidationSChema.validate(req.body);
  if (error)
    return res.status(400).json({ validationError: error.details[0].message });

  const { image, title, description } = req.body;

  if (image) {
    try {
      const uploadRes = await cloudinary.uploader.upload(image, {
        upload_preset: "alumni",
      });
      if (uploadRes) {
        const blog = new Blog({
          title,
          description,
          image: uploadRes,
        });
        await blog.save();
        res.status(201).json({
          status: "success",
          successMessage: "account created successfully",
          blog: blog,
        });
      }
    } catch (err) {
      res.status(500).json({ status: "fail", error: err });
    }
  }
};


const getAllBlogs = async (req,res)=>{
    try{
        const blogs= await Blog.find();
        return res.status(200).json({
            status:"success",
            "allblogs":blogs
        })
    }catch(err){
        return res.status(500).json({
            status:"fail",
            error:err.message
        })
    }
}
export {createBlog,getAllBlogs}