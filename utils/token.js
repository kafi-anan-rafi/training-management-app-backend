import jwt from 'jsonwebtoken';
import 'dotenv/config';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1h';

if (!JWT_SECRET) {
    throw new Error("Missing JWT_SECRET in environment variables");
}

export function generateToken(user) {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            name: user.firstName + " " + user.lastName
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRATION }
    );
}

export function verifyToken(token) {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (err) {
        console.error('Token verification failed:', err.message);
        return null;
    }
}
