import express from 'express';
import { db } from '../helper/db_connection.js';
import { io } from '../helper/socket_server.js';

export async function createLiveMatchController (req,res){
    console.log("LivestreamController called");

    const {home_team,away_team} = req.body;
    try {
      const[result] = await db.query("INSERT INTO matches (home_team,away_team) VALUES (?,?)",[home_team,away_team])
       
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