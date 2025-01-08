import { Request, Response, NextFunction } from 'express';

const errorHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch((err: Error) => {
            res.status(500).json({
                message: "Internal Server Error",
                error: err.message,
            });
        });
    };
};

export default errorHandler;
