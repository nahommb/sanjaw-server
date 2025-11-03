import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
const port = process.env.PORT || 4000;
import post_routes from './routes/post_routes.js';
import livestream_routes from './routes/livestream_routes.js';
import {db} from './helper/db_connection.js';
import cors from "cors";
import { Server } from "socket.io";

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/posts/',post_routes)
app.use('/api/livestream',livestream_routes)

// const io = new Server({
//     cors: {
//         origin: "*",
//         methods: ["GET", "POST"]
//     }
// });

// io.on("connection", (socket) => {
//   console.log("User connected:", socket.id);

//   socket.on("get_live_events", async () => {
//     try {
//       const [results] = await db.query(
//         "SELECT * FROM match_events ORDER BY created_at DESC"
//       );
//       socket.emit("live_events", results);
//     } catch (err) {
//       console.error("Error fetching live events:", err);
//     }
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.id);
//   });
// });

app.use(cors(
  {
    origin: '*',
    methods: ['GET','POST','PUT','DELETE'],
    allowedHeaders: ['Content-Type','Authorization']
  }
));
 // Initialize DB connection
// Sample route
app.get('/', (req, res) => {
  res.send('Hello World!');
}); 

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
}); 