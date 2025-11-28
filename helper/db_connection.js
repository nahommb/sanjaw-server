import mysql from 'mysql2/promise';

let db;

async function initDB() {
  db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "niyana",
    database: "sanjaw_db",
  });
  console.log("✅ Database connected");

//   // create tables if they don't exist
//   const tables = [
//     `
//     CREATE TABLE IF NOT EXISTS posts (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       title VARCHAR(255) NOT NULL,
//       content TEXT,
//       image_url VARCHAR(255),
//       video_url VARCHAR(255),
//       author VARCHAR(100),
//       media_urls JSON,
//       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//     )
//     `,
//    `CREATE TABLE IF NOT EXISTS admins (
//      id INT AUTO_INCREMENT PRIMARY KEY,
//      email:VARCHAR(255) NOT NULL,
//      password:VARCHAR(255) NOT NULL,
//      created_at:TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//      ) `,
//    `
//      CREATE TABLE IF NOT EXISTS stories (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       title VARCHAR(255) NOT NULL,
//       content TEXT,
//       media_urls JSON,
//       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//     )
//    `,
//     `
//     CREATE TABLE IF NOT EXISTS matchdays (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       match_date DATE NOT NULL,
//       event_type VARCHAR(100),
//       home_team VARCHAR(100) NOT NULL,
//       away_team VARCHAR(100) NOT NULL,
//       venue VARCHAR(255),
//       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//     )
//     `,
//     `
//     CREATE TABLE IF NOT EXISTS match_events (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       match_id INT NOT NULL,
//       event_type VARCHAR(100),
//       team_name VARCHAR(100),
//       team_type VARCHAR(100),
//       home_score INT DEFAULT 0,
//       away_score INT DEFAULT 0,
//       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//     )
//     `,
//     `
//     CREATE TABLE IF NOT EXISTS matches (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       home_team VARCHAR(100) NOT NULL,
//       away_team VARCHAR(100) NOT NULL,
//       live_id VARCHAR(100) NOT NULL,
//     )
//     `
//   ];

//   for (const sql of tables) {
//     try {
//       await db.query(sql); // no callback needed
//       console.log("✅ Table created or already exists.");
//     } catch (err) {
//       console.error("❌ Error creating table:", err.message);
//     }
//   }
 }

initDB();

export { db };
