import express from 'express';
import { register, login, forgotPassword } from '../controllers/authControllers.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Auth Route Operating');
});

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
export default router;