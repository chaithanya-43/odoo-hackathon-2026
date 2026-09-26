const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const ALLOWED_ROLES = [
    "admin",
    "inventory_manager",
    "warehouse_staff"
];

async function signup({ name, email, password, role }) {
    const normalizedEmail = email.trim().toLowerCase();

    // Check if email already exists
    const [existingUsers] = await db.execute(
        "SELECT id FROM users WHERE email = ?",
        [normalizedEmail]
    );

    if (existingUsers.length > 0) {
        const error = new Error("Email already registered");
        error.code = "EMAIL_EXISTS";
        throw error;
    }

    // Validate role
    if (!ALLOWED_ROLES.includes(role)) {
        const error = new Error("Invalid role");
        error.code = "INVALID_ROLE";
        throw error;
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const [result] = await db.execute(
        `INSERT INTO users
        (name, email, password_hash, role)
        VALUES (?, ?, ?, ?)`,
        [name.trim(), normalizedEmail, passwordHash, role]
    );

    return {
        id: result.insertId,
        name: name.trim(),
        email: normalizedEmail,
        role
    };
}

async function login({ email, password }) {
    const normalizedEmail = email.trim().toLowerCase();

    // Find user
    const [users] = await db.execute(
        `SELECT id, name, email, password_hash, role
         FROM users
         WHERE email = ?`,
        [normalizedEmail]
    );

    if (users.length === 0) {
        const error = new Error("Invalid email or password");
        error.code = "INVALID_CREDENTIALS";
        throw error;
    }

    const user = users[0];

    // Compare password with hashed password
    const passwordMatch = await bcrypt.compare(
        password,
        user.password_hash
    );

    if (!passwordMatch) {
        const error = new Error("Invalid email or password");
        error.code = "INVALID_CREDENTIALS";
        throw error;
    }

    if (!process.env.JWT_SECRET) {
        const error = new Error("JWT secret is not configured");
        error.code = "JWT_CONFIG_ERROR";
        throw error;
    }

    // Create JWT
    const token = jwt.sign(
        {
            id: user.id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    );

    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    };
}

async function getProfile(userId) {
    const [users] = await db.execute(
        `SELECT id, name, email, role, created_at
         FROM users
         WHERE id = ?`,
        [userId]
    );

    if (users.length === 0) {
        const error = new Error("User not found");
        error.code = "USER_NOT_FOUND";
        throw error;
    }

    return users[0];
}

module.exports = {
    signup,
    login,
    getProfile
};