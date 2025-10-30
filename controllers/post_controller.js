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

export function getMatchWeekPosts(req, res) {

}
 
