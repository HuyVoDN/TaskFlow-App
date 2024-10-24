import express from 'express';
import cors from 'cors';
import db from './db.js';
import authRoutes from './routes/auth.js';
import testRoutes from './routes/test.js';
import usersRoutes from './routes/users.js';
const app = express();

app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(express.json());

const server = app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/auth', authRoutes); 
app.use('/test', testRoutes);
app.use('/users', usersRoutes);