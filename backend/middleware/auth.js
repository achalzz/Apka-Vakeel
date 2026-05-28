const jwt = require("jsonwebtoken");

module.exports = async function authMiddleware(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            // Fallback for unauthenticated or local demo users
            req.user = { id: "demo-user-id", email: "demo@apkavakeel.com", name: "Demo User" };
            return next();
        }

        const token = authHeader.split(" ")[1];
        if (!token || token === "null" || token === "undefined") {
            req.user = { id: "demo-user-id", email: "demo@apkavakeel.com", name: "Demo User" };
            return next();
        }

        // Decode Clerk JWT token
        const decoded = jwt.decode(token);
        if (decoded && decoded.sub) {
            req.user = {
                id: decoded.sub, // Clerk User ID (e.g. user_2X...)
                email: decoded.email || "user@apkavakeel.com",
                name: decoded.name || "App User"
            };
        } else {
            req.user = { id: "demo-user-id", email: "demo@apkavakeel.com", name: "Demo User" };
        }
        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error.message);
        req.user = { id: "demo-user-id", email: "demo@apkavakeel.com", name: "Demo User" };
        next();
    }
};
