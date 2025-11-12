import express from 'express';
import { db } from '../helper/db_connection.js';
import { io } from '../helper/socket_server.js';


export async function createLiveMatchController (req,res){
    console.log("LivestreamController called");

    const {home_team,away_team,live_id} = req.body;
    try {
      const[result] = await db.query("INSERT INTO matches (home_team,away_team,live_id) VALUES (?,?,?)",[home_team,away_team,live_id])
       
       res.status(201).json({ message: "created", postId: result.insertId });
    }
    catch (err) {
        console.error("Error in LivestreamController:", err);
        res.status(500).json({ error: "Internal server error" });
    }
 
}

export async function getLiveMatchController (req,res){
    console.log("getLiveMatchController called");
    try {
       const [rows] = await db.query(
         "SELECT * FROM matches",
       );
       res.status(200).json(rows);
    }
    catch (err) {
        console.error("Error in getLiveMatchController:", err);
        res.status(500).json({ error: "Internal server error" });
    }
}

// POST /api/livestream/send-event
export async function sendLiveEventController(req, res) {
  const { match_id, event_type, team_name ,team_type} = req.body;

  if (!match_id || !event_type || !team_name || !team_type) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Insert into DB
    await db.query(
      "INSERT INTO match_events (match_id, event_type, team_name, team_type) VALUES (?, ?, ?, ?)",
      [match_id, event_type, team_name,team_type]
    );

    // Emit to all clients in the match room
    io.to(match_id).emit('new_live_event', { match_id, event_type, team_name,team_type });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

export async function editLiveScoreController(req,res){
  const {home_score,away_score,match_id} = req.body;

  try{
   await db.query("UPDATE mathe_events SET (home_score,away_score) VALUES (?, ?)",[home_score,away_score])
   io.to(match_id).emit('new_live_event',{home_score,away_score});

   res.json({success:true})
  }
  catch(err){
    console.log(err)
    res.status(500).json({error:err})
  }
}