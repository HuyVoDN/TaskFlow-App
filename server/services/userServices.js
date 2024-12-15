import db from "../db.js";
import crypto from "crypto";
import bcrypt from "bcryptjs";

class UserService {
  constructor() {
    this.getUserByEmail = this.getUserByEmail.bind(this);
    this.getUserIdByEmail = this.getUserIdByEmail.bind(this);
    this.verifyResetToken = this.verifyResetToken.bind(this);
    this.verifyResetTokenAPI = this.verifyResetTokenAPI.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
  }

  async getUserByEmail(email) {
    const query = "SELECT * FROM users WHERE email = ?";
    const [result] = await db.query(query, [email]);
    return result;
  }

  async getUserIdByEmail(email) {
    try {
      const query = "SELECT id_user FROM users WHERE email = ?";
      const [rows] = await db.query(query, [email]);
      if (rows.length > 0) {
        return {
          status: "success",
          id_user: rows[0].id_user,
        };
      } else {
        return {
          status: "error",
          message: "User not found",
        };
      }
    } catch (error) {
      console.error("SQL Error:", error);
      return {
        status: "error",
        message: "Internal Server Error",
      };
    }
  }

  generateResetToken() {
    return crypto.randomBytes(32).toString("hex");
  }

  async storeResetToken(email, resetToken) {
    const userResult = await this.getUserIdByEmail(email);
    if (userResult.status !== "success") {
      throw new Error("User not found");
    }
    const id_user = userResult.id_user;
    const query =
      "INSERT INTO password_reset_tokens (id_user, token, createdAt ,expiresAt) VALUES (?, ?, ?, ?);";
    const currentTime = new Date(Date.now());
    const expiry = new Date(Date.now() + 3600000); // Token valid for 1 hour
    await db.query(query, [id_user, resetToken, currentTime, expiry]);
  }

  async verifyResetToken(token) {
    try {
      console.log(token);
      const query = "SELECT * FROM password_reset_tokens WHERE token = ? and expiresAt > ?";
      const [rows] = await db.query(query, [token, new Date(Date.now())]);
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error("SQL Error:", error);
      throw new Error("Internal Server Error");
    }
  }

  // only for api endpoint testing
  async verifyResetTokenAPI(req, res) {
    const { token } = req.params;
    console.log(token);
    try {
      const tokenData = await this.verifyResetToken(token);
      
      if (tokenData) {
        return res.status(200).json({
          status: 'success',
          data: tokenData,
        });
      } else {
        return res.status(400).json({
          status: 'error',
          message: 'Invalid or expired token',
        });
      }
    } catch (error) {
      console.error("SQL Error:", error);
      return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  }

  async resetPassword(req, res) {
    const { token, newPassword } = req.body;
    const user = await this.verifyResetToken(token);
    console.log(req.body);
    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "Invalid or expired token",
      });
    }
    if (user.used == 1 ){
      return res.status(400).json({
        status: "error",
        message: "Token already used",
      });
    }
    const hashedPassword = bcrypt.hashSync(newPassword, 10);

    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      const updateUserQuery = "UPDATE users SET password = ? WHERE id_user = ?";
      await connection.query(updateUserQuery, [hashedPassword, user.id_user]);

      const updateTokenQuery = "UPDATE password_reset_tokens SET used = 1 WHERE id_user = ?";
      await connection.query(updateTokenQuery, [user.id_user]);

      await connection.commit();

      res.status(200).json({
        status: "success",
        message: "Password reset successfully",
      });
      console.log(`Password reset for user ${user.id_user} at ${new Date()}, newPassword : ${newPassword}`);
      
    } catch (error) {
      await connection.rollback();
      console.error("SQL Error:", error);
      res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    } finally {
      connection.release();
    }
  }
}

export default new UserService();
