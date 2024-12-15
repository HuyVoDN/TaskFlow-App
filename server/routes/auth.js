import express from 'express';
import { register, login, forgotPassword } from '../controllers/authControllers.js';
import UserServices from '../services/userServices.js';
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Auth Route Operating');
});

router.post('/register', register);
router.post('/login', login);
router.post('/forgotpassword', forgotPassword);
router.get('/verifytoken/:token', UserServices.verifyResetTokenAPI); 
router.post('/resetpassword', UserServices.resetPassword);  
export default router;