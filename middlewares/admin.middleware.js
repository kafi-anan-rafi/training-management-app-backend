import { verifyAccessToken } from '../utils/token.js';

export function isAdmin(req, res, next) {
    try  {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ msg: "Unauthorized: No token provided" });
        }
        const decoded = verifyAccessToken(token);
        if (decoded && decoded.role === 'admin') {
            return next();
        }
        return res.status(403).json({ msg: "Forbidden: Admins only" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "Server Error" });
    }
}