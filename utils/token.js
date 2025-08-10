import jwt from 'jsonwebtoken';
import 'dotenv/config';

const {
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  JWT_ACCESS_EXPIRATION,
  JWT_REFRESH_EXPIRATION
} = process.env;

if (!JWT_ACCESS_SECRET || !JWT_REFRESH_SECRET) {
    throw new Error("Missing JWT secrets in environment variables");
}

export function generateAccessToken(user) {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            name: user.firstName + " " + user.lastName
        },
        JWT_ACCESS_SECRET,
        { expiresIn: JWT_ACCESS_EXPIRATION }
    );
}

export function verifyAccessToken(token) {
    try {
        return jwt.verify(token, JWT_ACCESS_SECRET);
    } catch (err) {
        console.error('Token verification failed:', err.message);
        return null;
    }
}


export function generateRefreshToken(user) {
  return jwt.sign(
        {
            id: user.id,
            email: user.email,
            name: user.firstName + " " + user.lastName
        },
        JWT_REFRESH_SECRET,
        { expiresIn: JWT_REFRESH_EXPIRATION }
    );
}

export function verifyRefreshToken(token) {
    try {
        return jwt.verify(token, JWT_REFRESH_SECRET);
    } catch (err) {
        console.error('Token verification failed:', err.message);
        return null;
    }
}
