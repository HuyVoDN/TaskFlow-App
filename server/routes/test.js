import express from 'express';
import {getUsers} from '../controllers/testControllers.js';
const router = express.Router();

router.get('/test', (req, res) => {
    res.send('Test Route Operating');
});
router.get('/getusers', getUsers);
export default router;