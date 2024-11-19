import db from "../db.js";

const getUserByEmail = async (email) => { 
  const query = 'SELECT * FROM users WHERE email = ?'; 
  const [result] = await db.query(query, [email]); 
  return result; 
};

export {getUserByEmail};