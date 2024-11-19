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
      });
    }
    catch(error){
      console.log(error);
      res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }

  };

export { register, login };
