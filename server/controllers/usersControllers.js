import db from '../db.js';

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
export { getUserByUserName };