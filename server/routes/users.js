import express from 'express';
import { getUserByUserName } from '../controllers/usersControllers.js';
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Users Route Operating');
});
router.get('/:username', getUserByUserName);
export default router;