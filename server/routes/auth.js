import express from 'express';
import { register, login } from '../controllers/authControllers.js';

const router = express.Router();

router.get('/register', (req, res) => {
  res.send('Register Route Operating');
});

router.post('/register', register);
router.post('/login', login);

export default router;