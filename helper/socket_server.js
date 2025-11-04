// socket.js
import { Server } from "socket.io";
import { db } from "./db_connection.js";

let io;

export function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("✅ User connected:", socket.id);

    // Join a match room
    socket.on("join_match", (matchId) => {
      socket.join(matchId);
      console.log(`User ${socket.id} joined match ${matchId}`);
    });

    // Fetch live events for a match
    socket.on("get_live_events", async (matchId) => {
      console.log(matchId);
      try {
        const [rows] = await db.query(
          "SELECT * FROM match_events WHERE match_id = ? ORDER BY created_at DESC",
          [matchId]
        );
        console.log(rows)
        socket.emit("live_events", rows);
      } catch (err) {
        console.error("Error fetching live events:", err);
      }
    });

    // Send new event to a specific match room
    socket.on("send_live_event", async (eventData) => {
      const { match_id, event_type, team_name, team_type} = eventData;

      try {
        // Insert into DB
        await db.query(
          "INSERT INTO match_events (match_id, event_type, team_name,team_type) VALUES (?, ?, ?, ?)",
          [match_id, event_type, team_name,team_type]
        );

        // Fetch latest event to send
        const [rows] = await db.query(
          "SELECT * FROM match_events WHERE match_id = ? ORDER BY created_at DESC LIMIT 1",
          [match_id]
        );

        // Broadcast to all clients in the match room
        io.to(match_id).emit("new_live_event", rows[0]);
      } catch (err) {
        console.error("Error sending live event:", err);
      }
    });

    socket.on("disconnect", () => {
      console.log("❌ User disconnected:", socket.id);
    });
  });
}

export { io };
