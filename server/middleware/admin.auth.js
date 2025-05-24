import jwt from 'jsonwebtoken';

const adminAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // Check if the payload matches your admin credentials
        if (decoded.email !== process.env.ADMIN_EMAIL || decoded.role !== 'admin') {
            return res.status(403).json({ message: "Forbidden access" });
        }

        next();
    } catch (error) {
        console.error("Admin auth error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export default adminAuth;