import express from 'express';
import {getUsers} from '../controllers/testControllers.js';
import {sendEmail} from '../testing/test.js';
import UserServices from '../services/userServices.js';
import { forgotPassword } from '../controllers/authControllers.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Test Route Operating');
});
router.get('/getusers', getUsers);
router.post('/sendemail', sendEmail);
router.get('/getuserid/:email', UserServices.getUserIdByEmail);
router.post('/forgotpassword', forgotPassword);
router.get('/verifytoken/:token', UserServices.verifyResetToken); 
router.post('/resetpassword', UserServices.resetPassword);   
export default router;