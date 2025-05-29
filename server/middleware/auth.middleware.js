import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized, please login again' });
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log('Decoded token:', token_decode);
        req.user = { id: token_decode.id };
        next();
    } catch (error) {
        console.error('JWT Error:', error);
        return res.status(403).json({ success: false, message: error.message });
    }
};

export default authUser;