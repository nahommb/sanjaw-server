import { db } from "../helper/db_connection.js";

export async function createStory(req,res){
  
    try{

    const media_urls = req.files.map((file)=>file.path)

    const {title,content} = req.body;

    const [result] = await db.query(
        "INSER INTO storys (title,content,media_urls) VALUES (?, ?, ?)",[title,content,JSON.stringify(media_urls)]
    );
    res.status(200).json({message:'Story created',story:result})
    }
    catch(err){
      res.status(500).json({error:err.message})
    }
   
}