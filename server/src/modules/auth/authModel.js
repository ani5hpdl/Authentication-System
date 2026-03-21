const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db.js");

const User = sequelize.define(
  "User",
  {
    // ─── Primary Key ───────────────────────────────────────────
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    // ─── Basic Info ────────────────────────────────────────────
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: [2, 100],
        notEmpty: true,
      },
    },

    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },

    // ─── Password ──────────────────────────────────────────────
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    passwordChangedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    // Last 5 hashed passwords to prevent reuse
    passwordHistory: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      defaultValue: [],
    },

    // ─── Role & Status ─────────────────────────────────────────
    role: {
      type: DataTypes.ENUM("user", "admin"),
      defaultValue: "user",
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

    isSuspended: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    suspensionReason: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    // ─── Email Verification ────────────────────────────────────
    isEmailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    verificationToken: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    verificationExpiresIn: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    // ─── Password Reset ────────────────────────────────────────
    passwordResetToken: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    passwordResetExpiresIn: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    // ─── Brute Force / Account Lockout ─────────────────────────
    loginAttempts: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    lockUntil: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    lastFailedLoginAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    // ─── MFA / 2FA ─────────────────────────────────────────────
    isTwoFactorEnabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    twoFactorSecret: {
      type: DataTypes.STRING(255), // store AES-256 encrypted
      allowNull: true,
    },

    // Hashed one-time backup codes
    backupCodes: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      defaultValue: [],
    },

    // ─── Session / Token Management ────────────────────────────
    // Increment to invalidate ALL sessions at once (e.g. on password change)
    tokenVersion: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    // ─── Login Tracking ────────────────────────────────────────
    lastLoginAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    lastLoginIp: {
      type: DataTypes.STRING(45), // supports IPv6
      allowNull: true,
    },

    lastLoginUserAgent: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

module.exports =  User ;