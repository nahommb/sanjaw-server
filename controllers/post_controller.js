import { db } from "../helper/db_connection.js";


export function createPost(req, res) {
   db.query(
    'INSERT INTO posts (title, content, image_url, author) VALUES (?, ?, ?, ?)',
    [req.body.title, req.body.content, req.body.image_url, req.body.author],
    (err, results) => {
      if (err) {
        console.error('Error inserting post:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(201).json({ message: 'Post created', postId: results.insertId });
    }
  );
   
}

export function getPosts(req, res) {
  
}
export function updatePost(req, res) {

}

export function deletePost(req, res) {

}
export function createMatchDay(req, res) {

    console.log(req.body);
    const { match_date, event_type, home_team, away_team, home_score, away_score, venue } = req.body;
    const match_date_mysql = new Date(match_date).toISOString().slice(0, 19).replace('T', ' ');

    db.query(
      'INSERT INTO matchdays (match_date, event_type, home_team, away_team, home_score, away_score, venue) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [match_date_mysql, event_type, home_team, away_team, home_score, away_score, venue],
      (err, results) => {
        if (err) {
          console.error('Error inserting match day:', err);
          return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ message: 'Match day created', matchDayId: results.insertId });
      }
    );
} 

export function getMatchDays(req, res) {
   db.query('SELECT * FROM matchdays WHERE match_date > CURRENT_TIMESTAMP ', (err, results) => {
    if (err) {
      console.error('Error fetching match days:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(200).json(results); 
  });
}
  
