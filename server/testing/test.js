import {transporter} from "../services/emailServices.js";
import nodemailer from 'nodemailer';
import db from '../db.js';

const sendEmail = async (req, res) => {
    try {
        const {recipientEmail, subject, message} = req.body;

        const mailOptions = {
            to: recipientEmail,
            subject: subject || "Test Email",
            text: message || "This is a test email",
        };
        await transporter.sendMail(mailOptions);
        res.status(200).json({
            status: 'success',
            message: 'Email sent successfully',
        });

    } 
    catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json(
            {
                status: 'error',
                message: 'Internal Server Error',
                error: error.message,
            });
    }
};

export {sendEmail};