/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Auth error' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Auth error' });
    }
};

export default auth;
