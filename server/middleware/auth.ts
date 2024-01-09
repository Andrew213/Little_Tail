import type { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from 'config';

const auth = (req: Request & { user: unknown }, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') {
        return next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Auth error' });
        }

        const decoded = jwt.verify(token, config.get('secretKey'));

        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Auth error' });
    }
};

export default auth;
