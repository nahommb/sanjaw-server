import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
const port = process.env.PORT || 4000;
import post_routes from './routes/post_routes.js';
import livestream_routes from './routes/livestream_routes.js';
import story_routes from './routes/story_routes.js';
import previous_matches_routes from './routes/previous_matches_routes.js';
import auth_routes from './routes/auth_routes.js';
import {db} from './helper/db_connection.js';
import cors from "cors";
import http from 'http';
import { Server } from "socket.io";
import { initSocket } from './helper/socket_server.js';


app.use(cors(
  {
    origin: ['http://localhost:5173',],
    credentials: true, 
    methods: ['GET','POST','PUT','DELETE,PATCH'],
    allowedHeaders: ['Content-Type','Authorization']
  }
)); 

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/posts/',post_routes)
app.use('/api/livestream',livestream_routes)
app.use('/api/stories',story_routes)
app.use('/api/previousmatches',previous_matches_routes)
app.use('/api/auth',auth_routes)
 
// Setup Socket.IO
  
 
const server = http.createServer(app);
initSocket(server);


 // Initialize DB connection  
// Sample route
app.get('/', (req, res) => {
  res.send('Hello World!');
});  

// Start the server
server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});      