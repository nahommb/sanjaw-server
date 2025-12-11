import bcrypt from "bcryptjs";
import { generateToken } from "../helper/generate_token.js";
import { db } from "../helper/db_connection.js";
import generatore  from "generate-password";
import jwt from "jsonwebtoken";


export async function  createAdmin(req,res){

    // const testEmail = 'nahomjr17@gmail.com';
    // const testRole = 'admin';

    const {email,role} = req.body;
    
   try{
     const [row] = await db.query("SELECT * FROM admins WHERE email = ?",[email]);

     if(row.length!== 0){
       return res.status(400).json({message:'Admin Already Exist in this Email'})
     }
     // generate password 
     const password = generatore.generate({
        length: 8,
        numbers: true,
        symbols: true,
        uppercase: true,
        lowercase: true,
     });

       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(password, salt);
     //send to email the password using smpt
     console.log(password);

     await db.query("INSERT INTO admins (email, password,role) VALUES (?, ?, ?)",[email,hashedPassword,role])

    return res.status(201).json({message:'created successfuly'})
   }
   catch(err){
     return res.status(500).json({message:'internal server error'})
   }
}

export async function loginController(req, res) {
  const { email, password } = req.body;

  console.log(password);

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  try {
    // 1️⃣ Query database using async/await (no callback)
    const [rows] = await db.query(
      "SELECT * FROM admins WHERE email = ?",
      [email]
    );

    // 2️⃣ Check if user exists
    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = rows[0];
    console.log(user)
    // 3️⃣ Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 4️⃣ Generate JWT token
    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    // 5️⃣ Respond success
    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email, 
        role: user.role,
      },
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}

export function validetToken(req, res){
  
  console.log('validetToken called');
  // console.log(process.env.JWT_SECRET)

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Not authenticated" });
  // console.log('Token:', token); 
  // Verify token (using JWT)
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ user: { email: decoded.email,id:decoded.id } });
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
}; 

export async function deleteAdmin(req, res) {
  const { email } = req.body; // or use req.params.id
 
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const [result] = await db.query(
      "DELETE FROM admins WHERE email = ?",
      [email]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Admin not found" });
    }

    return res.status(200).json({ message: "Admin deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function changePassword(res,req){

  try{
    const {id} = req.params;
    const {oldPassword,newPassword} = req.body;

    const [result] = await db.query("SELECT FROM admins WHERE id = ?",[id]);
    if(result.length == 0){
      return res.status(404).json({message:'Admin not found'})
    }
    else{
      if(result[0].password == oldPassword){
       const [row] = await db.query('UPDATE admins WHERE id = ? password = ?',[id,newPassword]);
       if(row.affectedRows == 0){
        return res.status(500).json({ message: "Server error" });
       }
        res.status(200).json({message:'successfuly changed'})
      }
      res.status(403).json({message:'Unauthorized'})
    }
    
  }
  catch(err){
  return res.status(500).json({ message: "Server error" });
  }
}


//a,YuF9cB  