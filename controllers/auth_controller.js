import bcrypt from "bcrypt";
import { generateToken } from "../helper/generate_token.js";
import { db } from "../helper/db_connection.js";
import { generatore } from "generate-password";


export async function  createAdmin(req,res){
    const {email,role} = req.body;

   try{
     const [row] = await db.query("SELECT * FROM admins WHERE email = ?",[email]);

     if(row.length!==0){
        res.status(203).json({message:'Admin Already Exist in this Email'})
     }
     // generate password 
     const password = generatore.generate({
        length: 8,
        numbers: true,
        symbols: true,
        uppercase: true,
        lowercase: true,
     })
     const hashedPassword = password;

     //send to email the password using smpt

     db.query("INSERT INTO admins (email, password,role) VALUES (?, ?, ?)",[email,hashedPassword,role])
   }
   catch(err){
     res.status(500).json({message:'internal server error'})
   }
}


export function loginController(req, res) {
  const { email, password } = req.body; 

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  try {
    const sql = "SELECT * FROM admins WHERE email = ?";
    db.query(sql, [email], async (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Database error" });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      const user = results[0];

    
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      
      const token = generateToken({
        id: user.id,
        email: user.email,
      });

      return res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          email: user.email,
        },
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
}
