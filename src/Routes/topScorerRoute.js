import { createTopScorer,deleteTopScorer,updateTopScorer,getTopScorers } from "../Controllers/ScorerController.js";
import  Express from "express";
import authLogin from "../Midleware/authentication.js";
const topScorerRoute= Express.Router();



topScorerRoute.post('/addTopScorer',createTopScorer)
topScorerRoute.get('/getTopScorers',getTopScorers)
topScorerRoute.post('/updateTopScorer/:id',updateTopScorer)
topScorerRoute.delete('/deleteTopScorer/:id',deleteTopScorer)



export default topScorerRoute