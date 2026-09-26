const AuthService = require("../services/authService");

const authController = {
    register: async (req, res, next) => {
        try {
            const { name, email, password, role } = req.body;

            if (!name || !email || !password) {
                return res.status(400).json({
                    success: false,
                    message: "Name, email and password are required"
                });
            }

            const user = await AuthService.register({
                name,
                email,
                password,
                role
            });

            res.status(201).json({
                success: true,
                message: "Registration successful",
                data: user
            });
        } catch (error) {
            next(error);
        }
    },

    login: async (req, res, next) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: "Email and password are required"
                });
            }

            const data = await AuthService.login({
                email,
                password
            });

            res.json({
                success: true,
                message: "Login successful",
                data
            });
        } catch (error) {
            error.status = 401;
            next(error);
        }
    }
};

module.exports = authController;
