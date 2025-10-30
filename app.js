import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
const port = process.env.PORT || 4000;
import post_routes from './routes/post_routes.js';
import {db} from './helper/db_connection.js';

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/posts/',post_routes)

 // Initialize DB connection
// Sample route
app.get('/', (req, res) => {
  res.send('Hello World!');
}); 

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
}); 