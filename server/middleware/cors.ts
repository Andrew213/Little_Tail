import type { Response, Request, NextFunction } from 'express';

const cors = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    };
};
export default cors;