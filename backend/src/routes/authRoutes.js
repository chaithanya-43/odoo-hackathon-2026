const express = require("express");
const { body } = require("express-validator");

const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Signup
router.post(
    "/signup",
    [
        body("name")
            .trim()
            .notEmpty()
            .withMessage("Name is required")
            .isLength({ max: 100 })
            .withMessage("Name must not exceed 100 characters"),

        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Enter a valid email address")
            .normalizeEmail(),

        body("password")
            .isString()
            .notEmpty()
            .withMessage("Password is required")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters"),

        body("role")
            .notEmpty()
            .withMessage("Role is required")
            .isIn([
                "admin",
                "inventory_manager",
                "warehouse_staff"
            ])
            .withMessage("Invalid role")
    ],
    authController.signup
);

// Login
router.post(
    "/login",
    [
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Enter a valid email address")
            .normalizeEmail(),

        body("password")
            .isString()
            .notEmpty()
            .withMessage("Password is required")
    ],
    authController.login
);

// Profile
router.get(
    "/profile",
    authMiddleware,
    authController.profile
);

module.exports = router;