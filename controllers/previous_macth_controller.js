import { db } from "../helper/db_connection.js";

export async function createPreviousMatchController(req,res){

    const {home_team,away_team,home_score,away_score,match_type} = req.body;
 try{
     const [result] = await db.query(
        "INSERT INTO previous_matches (home_team,away_team,home_score,away_score,match_type) VALUES (?, ?, ?, ?, ?)",
        [home_team,away_team,home_score,away_score.match_type]
    )

    res.status(200).json(result);
 }
 catch(err){
   res.status(500).json(err)    
 }
   
}

export async function getPreviousMacthController(req,res){

    try{
        const [result] = await db.query(
            "SELECT * FROM previous_matches ORDER BY created_at DESC LIMIT 20"
        )
        res.status(200).json(result);
    }
    catch(err){ 
        res.status(500).json(err)
    }
}