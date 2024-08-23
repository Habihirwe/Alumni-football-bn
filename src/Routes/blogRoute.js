import { createBlog,getAllBlogs } from "../Controllers/blogController.js";
import  Express from "express";
const blogRoute= Express.Router();



blogRoute.post('/createBlog',createBlog)
blogRoute.get('/getAllBlogs',getAllBlogs)



export default blogRoute