import mysql from 'mysql2';
import {config} from 'dotenv';
import fs from 'fs';
config();

const serverCA = [fs.readFileSync('./DigiCertGlobalRootCA.crt.pem')];
if (serverCA == null)
{
    console.log("Error reading serverCA file");
}

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS, // Ensure this matches the .env file
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: true,
        ca: serverCA},
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
export default db;