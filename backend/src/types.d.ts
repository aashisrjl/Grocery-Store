import * as express from 'express';

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                username: string;
                email: string;
                role?: string;
                password: string;
                googleId?: string;
                otp?: number;
            };
        }
    }
}
