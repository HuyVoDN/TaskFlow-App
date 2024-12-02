import db from '../db.js';
import UserServices from '../services/userServices.js';

const getUserByUserName = async (req, res) => {
    try {
        const query = `SELECT * FROM users WHERE username = ?`;
        const [users] = await db.query(query, req.params.username);
        res.status(200).json({
            status: 'success',
            results: users.length,
            data: {
                users: users,
            },
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
        });
    }
};

const getUserInfo = async (req, res) => {
    try {
        const query = `SELECT * FROM users WHERE email = ?`;
        const [users] = await db.query(query, req.params.email);
        res.status(200).json({
            status: 'success',
            results: users.length,
            data: {
                users: users,
            },
        });
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
export { getUserByUserName, getUserInfo};