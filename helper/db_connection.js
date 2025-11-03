// Example using the 'mysql2' driver
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
}

initDB();

export { db };


// // create tables if they don't exist
//  const tables = [
//     // posts table
//     `
//     CREATE TABLE IF NOT EXISTS posts (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       title VARCHAR(255) NOT NULL,
//       content TEXT,
//       image_url VARCHAR(255),
//       video_url VARCHAR(255),
//       author VARCHAR(100),
//       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//     )
//     `,
//     // matchdays table
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
//    `,
//    `
//   CREATE TABLE match_events (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   match_id INT NOT NULL,
//   event_type VARCHAR(100),
//   team_name VARCHAR(100),
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// )`

    
//   ];

//   // 4️⃣ Execute all table creations sequentially
//   tables.forEach((sql) => {
//     db.query(sql, (err) => {
//       if (err) {
//         console.error('❌ Error creating table:', err.message);
//       } else {
//         console.log('✅ Table created or already exists.');
//       }
//     });
//   });
