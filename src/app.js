import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import bodyParser from "body-parser";
import userRoute from "./Routes/userRoute.js";
import blogRoute from "./Routes/blogRoute.js";
import fileUpload from 'express-fileupload';
import messageRoute from "./Routes/messageRoute.js";


const app = express();

app.use(cors());

app.use(bodyParser.json({limit: "100mb"}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.urlencoded({extended: true}));
app.use(express.json({limit: "100mb", extended: true}))
app.use(express.urlencoded({limit: "100mb", extended: true, parameterLimit: 50000}))
app.use(bodyParser.json({
    type: ["application/x-www-form-urlencoded", "application/json","application/form-data"], 
  }));



dotenv.config();

app.use("/api", userRoute)
app.use("/api",blogRoute)
app.use("/api",messageRoute)

export default app;