import { db } from "../helper/db_connection.js";

export async function createStory(req,res){ 
  
    try{

    const media_urls = req.files.map((file)=>file.path)

    const {title,content} = req.body;

    const [result] = await db.query(
        "INSERT INTO stories (title,content,media_urls) VALUES (?, ?, ?)",[title,content,JSON.stringify(media_urls)]
    );
    console.log(result);
    res.status(200).json({message:'Story created',story:result})
    }
    catch(err){
      console.log(err)
      res.status(500).json({error:err.message})
    }
   
}


export async function getStoryController(req,res){
  try{
    const [result] = await db.query("SELECT * FROM stories")

    res.status(200).json(result)
  }
  catch(err){
    res.status(500).json({error:err.message})
  }
}
export async function deleteStory(req,res){
  const {id} = req.params;
  try{


   
       const [rows] = await db.query("SELECT media_urls FROM stories WHERE id = ?", [id]);
   
       if (rows.length === 0) {
         return res.status(404).json({ message: "Story not found" });
       }
   
       const media = JSON.parse(rows[0].media_urls); 
   
     
       for (let url of media) {
   
         const parts = url.split("/");
         const resourceType = parts[parts.indexOf("upload") - 1];  
       
         const fileName = parts[parts.length - 1]; 
         const publicId = fileName.split(".")[0];   
   
         console.log("Deleting:", publicId, "Type:", resourceType);
   
      
         await cloudinary.uploader.destroy(publicId, {
           resource_type: resourceType
         });
       }
  
    await db.query("DELETE FROM stories WHERE id = ?",[id])

    res.status(200).json({message:'Story deleted successfully'})
  }
  catch(err){
    res.status(500).json({error:err.message})
  }
}