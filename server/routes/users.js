import express from 'express';
import { getUserInfo } from '../controllers/usersControllers.js';
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Users Route Operating');
});
router.get('/:email', getUserInfo);
export default router;