import { Request, Response, NextFunction } from 'express';

const errorHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch((err: Error) => next(err));
    };
};

export default errorHandler;
