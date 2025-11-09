import { db } from "../helper/db_connection.js";


export async function createPost(req, res) {
  try {
    const { title, content, author } = req.body;

    // Extract file URLs from Cloudinary
    const mediaUrls = req.files.map((file) => file.path);

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



export function updatePost(req, res) {

} 

export function deletePost(req, res) {

}

export async function createMatchDay(req, res) {
  console.log(req.body);

  try {
    const { match_date, event_type, home_team, away_team, venue } = req.body;

    // Convert JS date to MySQL DATETIME format
    const match_date_mysql = new Date(match_date)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    // Execute insert query
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
      "SELECT * FROM matchdays WHERE match_date > CURRENT_TIMESTAMP ORDER BY match_date ASC LIMIT 10"
    );
    res.status(200).json(results);
  } catch (err) {
    console.error("Error fetching match days:", err);
    res.status(500).json({ error: "Database error" });
  }
}


//WHERE match_date > CURRENT_TIMESTAMP LIMIT 10
  
