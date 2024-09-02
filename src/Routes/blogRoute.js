import { createPost,deleteblog,getAllBlogs,getSingleBlog,updateBlog,addComment} from "../Controllers/blogController.js";
import authLogin from "../Midleware/authentication.js";
import upload from "../utils/multer.js";
import  Express from "express";
const blogRoute= Express.Router();



blogRoute.post('/createBlog', authLogin,upload.single('image'),createPost)
blogRoute.get('/getblogs',getAllBlogs)
blogRoute.get('/blog/:id',getSingleBlog);
blogRoute.delete('/deleteblog/:id', deleteblog);
blogRoute.post('/updateblog/:id',upload.single('image'), updateBlog);
blogRoute.post('/comment/blog/:id',authLogin,addComment);

export default blogRoute