import { Server } from "socket.io";
import { db } from "../helper/db_connection.js";

const io = new Server({
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

export async function  LivestreamController(req, res) {
    const{match_id,event_type,team_name}=req.body;
    console.log(req.body);
    try{
        const [results] = await db.query(
        'INSERT INTO match_events (match_id, event_type, team_name) VALUES (?, ?, ?)',
        [match_id, event_type, team_name]
    );

    io.emit('new_match_event', { match_id, event_type, team_name });

    res.status(201).json({ message: 'Match event created', eventId: results.insertId });
    }
    catch(err){
        console.error('Error inserting match event:', err);
        return res.status(500).json({ error: 'Database error' });
    }

    io.on('connection', (socket) => {
        console.log('a user connected:', socket.id);
        
        io.on('get_live_events', () => {
            // Fetch live events from the database and emit to the client
            db.query('SELECT * FROM match_events ORDER BY created_at DESC', (err, results) => {
                if (err) {
                    console.error('Error fetching live events:', err);
                    return;
                }
                socket.emit('live_events', results); 
            });
        });

        socket.on('disconnect', () => {
            console.log('user disconnected:', socket.id);
        });
    });
} 