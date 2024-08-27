import { createMessage,getAllMessage,deleteMessage} from "../Controllers/messageController.js";

import  Express from "express";
const messageRoute= Express.Router();



messageRoute.post('/createMessage', createMessage)
messageRoute.get('/getmessage', getAllMessage)
messageRoute.delete('/deletemessage/:id', deleteMessage)


export default messageRoute