import db from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';
import {getUserByEmail} from "../services/userServices.js";

////////////////////////////////
// helper utilities functions //
////////////////////////////////

  // Register function
  const register = async (req, res) => {
    try {
      const { username, email, password } = req.body;
      // Check if the user already exists
      const user = await getUserByEmail(email);
      if (user.length > 0) {
        console.log(`A new user tried to register with an existing email. Email: ${email} at ${new Date()}`);
        return res.status(400).json({
          status: 'error',
          message: 'User already exists',
        });
        
      }
  
      // Hash the password
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
  
      // Insert the new user into the database
      const query = 'INSERT INTO users (username, email, password, createdAt) VALUES (?, ?, ?, ?)';
      await db.query(query, [username, email, hashedPassword, new Date()]);
  
      res.status(201).json({
        status: 'success',
        message: 'User registered successfully',
      });
      console.log(`New User was registered: ${username} at ${new Date()}`);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  };
  
const updateUserPassword = async(email, password) =>{
  try{
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const query = 'UPDATE users SET password = ? WHERE email = ?';
    await db.query(query, [hashedPassword, email]);
    return true;
  }
  catch(error){
    console.log(error);
    return false;
  }
};


////////////////////
// main functions //
////////////////////


const login = async (req, res) => 
  {
    try {
      const { email, password } = req.body;
      // Check if the user exists
      const user = await getUserByEmail(email);
      if (user.length === 0) {
        return res.status(400).json({
          status: 'error',
          message: 'Invalid credentials, User does not exist',
        });
      }
  
      // Check if the password is correct
      const isPasswordValid = bcrypt.compareSync(password, user[0].password);
      console.log(user[0].password);
      console.log(isPasswordValid);
      if (!isPasswordValid) {
        return res.status(400).json({
          status: 'error',
          message: 'Invalid credentials, Password is incorrect',
        });
      }
  
      // Create a JWT token
      const token = jwt.sign(
        { id: user[0].id, email: user[0].email },
        process.env.JWT_SECRET,
        {
          expiresIn: '1h',
        }
      );
  
      res.status(200).json({
        status: 'success',
        message: 'User logged in successfully',
        token,
        user: {
          id: user[0].id,
          username: user[0].username,
          email: user[0].email},
      });
      console.log(`User ${user[0].username} logged in at ${new Date()} with a token of ${token}`);
    }
    catch(error){
      console.log(error);
      res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }

  };

// Finish implement this after user page has been made.
const logout = async (req, res) => {

  try {
    const token = req.headers.authorization.split(' ')[1];
    res.status(200).json({
      status: 'success',
      message: 'User logged out successfully',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
}
export { register, login };
