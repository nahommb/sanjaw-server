import { db } from "../helper/db_connection.js";
import { v2 as cloudinary } from "cloudinary";

export async function createPost(req, res) {
  try {
    const { title, content, author } = req.body;

    // Extract file URLs from Cloudinary
    const mediaUrls = req.files.map((file) => file.path);

    // console.log(mediaUrls);
    // Save to DB (store mediaUrls as JSON string)
    const [result] = await db.query(
      "INSERT INTO posts (title, content, author, media_urls) VALUES (?, ?, ?, ?)",
      [title, content, author, JSON.stringify(mediaUrls)]
    );

    res.status(201).json({
      message: "Post created successfully",
      postId: result.insertId, 
      media: mediaUrls,
    });
  } catch (err) {
    console.error("Error inserting post:", err);
    res.status(500).json({ error: "Database error" });
  }
} 

export async function getPosts(req, res) {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 4;
  const offset = (page - 1) * limit; 

  try {
    const [results] = await db.query(
      "SELECT * FROM posts ORDER BY created_at DESC LIMIT ? OFFSET ?",
      [limit, offset]
    );
    res.status(200).json(results);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ error: "Database error" });
  }
}



export async function updatePost(req, res) {

  const {content} = req.body;
  const {id} = req.params;
 
  try{
   const [row] = await db.query("UPDATE posts SET content = ? WHERE id = ?",[content,id])
   if(row.affectedRows === 0){
    return res.status(404).json({message:'Post not found'})
   }
   res.status(200).json({message:'updated successfuly'})
  }
  catch(err){
    res.status(500).json({message:'Internal server error'})
  }
} 

export async function deletePost(req, res) {
  
  const { id } = req.params;
  try {
 
    const [rows] = await db.query("SELECT media_urls FROM posts WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Post not found" });
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

  
    const [result] = await db.query("DELETE FROM posts WHERE id = ?", [id]);

    res.status(200).json({ message: "Post deleted successfully" });

  } catch (err) {
    console.error("Error deleting post:", err);
    res.status(500).json({ error: "Server Error" });
  }
}

export async function createMatchDay(req, res) {
  console.log(req.body);

  try {
    const { match_date, event_type, home_team, away_team, venue } = req.body;

    
    const match_date_mysql = new Date(match_date)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

   
    const [result] = await db.query(
      "INSERT INTO matchdays (match_date, event_type, home_team, away_team, venue) VALUES (?, ?, ?, ?, ?)",
      [match_date_mysql, event_type, home_team, away_team, venue]
    );

    res
      .status(201)
      .json({ message: "Match day created", matchDayId: result.insertId });
  } catch (err) {
    console.error("Error inserting match day:", err);
    res.status(500).json({ error: "Database error" });
  }
}


export async function getMatchDays(req, res) {
  console.log("Fetching match days");
  try {
    const [results] = await db.query(
      "SELECT * FROM matchdays ORDER BY match_date ASC LIMIT 10"
    );
    res.status(200).json(results);
  } catch (err) {
    console.error("Error fetching match days:", err);
    res.status(500).json({ error: "Database error" });
  }
}


//WHERE match_date > CURRENT_TIMESTAMP LIMIT 10
  
