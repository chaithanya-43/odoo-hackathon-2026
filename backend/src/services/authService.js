const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

const AuthService = {
    async register({ name, email, password, role = "inventory_manager" }) {
        const [existing] = await pool.query(
            "SELECT id FROM users WHERE email=?",
            [email]
        );

        if (existing.length) {
            throw new Error("Email already registered");
        }

        const password_hash = await bcrypt.hash(password, 10);

        const [result] = await pool.query(
            "INSERT INTO users(name,email,password_hash,role) VALUES(?,?,?,?)",
            [name, email, password_hash, role]
        );

        return {
            id: result.insertId,
            name,
            email,
            role
        };
    },

    async login({ email, password }) {
        const [rows] = await pool.query(
            "SELECT * FROM users WHERE email=?",
            [email]
        );

        if (!rows.length) {
            throw new Error("Invalid email or password");
        }

        const user = rows[0];

        const valid = await bcrypt.compare(password, user.password_hash);

        if (!valid) {
            throw new Error("Invalid email or password");
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
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
};

module.exports = AuthService;
