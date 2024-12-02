import db from "../db.js";
import crypto from "crypto";
import bcrypt from "bcryptjs";

class UserService {
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
      "UPDATE password_reset_tokens SET token = ?, expiresAt = ? WHERE id_user = ?";
    const expiry = Date.now() + 3600000; // Token valid for 1 hour
    await db.query(query, [resetToken, expiry, id_user]);
  }

  async verifyResetToken(token) {
    const query =
      "SELECT * FROM password_reset_tokens WHERE token = ? AND expiresAt > ?";
    const [rows] = await db.query(query, [token, Date.now()]);
    return rows.length > 0 ? rows[0] : null;
  }

  async resetPassword(req, res) {
    const { token, newPassword } = req.body;
    const user = await this.verifyResetToken(token);

    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "Invalid or expired token",
      });
    }

    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    const query =
      "UPDATE users SET password = ?, resetToken = NULL, resetTokenExpiry = NULL WHERE id_user = ?";
    await db.query(query, [hashedPassword, user.id_user]);

    res.status(200).json({
      status: "success",
      message: "Password reset successfully",
    });
  }
}

export default new UserService();