import mysql from 'mysql2';
import {config} from 'dotenv';

config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS, // Ensure this matches the .env file
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
}).promise();

const connectDB = db.getConnection()
    .then(connection => {
        console.log('Database connection successful');
        connection.release(); // Release the connection back to the pool
    })
    .catch(error => {
        console.error('Database connection failed:', error);
    });
    
const closeConnection = async () => {
    db.end();
};
export default {db, closeConnection, connectDB};