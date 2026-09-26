const { validationResult } = require("express-validator");
const authService = require("../services/authService");

function sendServiceError(res, error) {
    if (error.code === "EMAIL_EXISTS") {
        return res.status(409).json({
            success: false,
            message: "Email already registered"
        });
    }

    if (error.code === "INVALID_ROLE") {
        return res.status(400).json({
            success: false,
            message: "Invalid role"
        });
    }

    if (error.code === "INVALID_CREDENTIALS") {
        return res.status(401).json({
            success: false,
            message: "Invalid email or password"
        });
    }

    if (error.code === "USER_NOT_FOUND") {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    if (error.code === "JWT_CONFIG_ERROR") {
        return res.status(500).json({
            success: false,
            message: "Authentication service is not configured"
        });
    }

    console.error(error);

    return res.status(500).json({
        success: false,
        message: "Internal server error"
    });
}

async function signup(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: errors.array()[0].msg
        });
    }

    try {
        const user = await authService.signup({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        });

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                user
            }
        });
    } catch (error) {
        return sendServiceError(res, error);
    }
}

async function login(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: errors.array()[0].msg
        });
    }

    try {
        const result = await authService.login({
            email: req.body.email,
            password: req.body.password
        });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: result
        });
    } catch (error) {
        return sendServiceError(res, error);
    }
}

async function profile(req, res) {
    try {
        const user = await authService.getProfile(req.user.id);

        return res.status(200).json({
            success: true,
            message: "Profile fetched successfully",
            data: {
                user
            }
        });
    } catch (error) {
        return sendServiceError(res, error);
    }
}

module.exports = {
    signup,
    login,
    profile
};