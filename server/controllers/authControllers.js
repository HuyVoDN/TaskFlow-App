import db from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Function to get user by email
const getUserByEmail = async (email) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    const [result] = await db.query(query, [email]);
    return result;
  };
  
  // Register function
  const register = async (req, res) => {
    try {
      const { username, email, password } = req.body;
      // Check if the user already exists
      const user = await getUserByEmail(email);
      if (user.length > 0) {
        return res.status(400).json({
          status: 'error',
          message: 'User already exists',
        });
      }
  
      // Hash the password
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
  
      // Insert the new user into the database
      const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
      await db.query(query, [username, email, hashedPassword]);
  
      res.status(201).json({
        status: 'success',
        message: 'User registered successfully',
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  };
  

const login = async (req, res) => {
  
};

export { register, login };
