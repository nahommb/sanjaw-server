import { generateToken } from "../helper/generate_token.js";
import { db } from '../helper/db_connection.js';

export function loginController(req,res){

    const [email,password] = req.body;

    try{  

        const hashedPassword = bcrypt;

     db.quary("")        

    }
    catch(err){

        res.status(500).json({message:'server error'})
    }
}