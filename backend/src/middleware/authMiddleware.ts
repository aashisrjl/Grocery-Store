import express,{ NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../database/models/userModel';
import { AuthRequest, Role } from '../types/authRequest';
// promissify
const { promisify } = require('util');

class AuthMiddleware {
    async isAuthenticated(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
        const token = req.headers.authorization;

        if (!token) {
             res.status(403).json({ message: "Token not provided" })
             return;
        }

        try {
            const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET as string);

            // Fetch user data from the database
            const userData = await User.findByPk(Number(decoded.id));

            if (!userData) {
                res.status(404).json({ message: "No user found with that token" })
                return ;
            }

            // Attach user data to the request object
            req.user = userData;
            // req.user = {
            //     id: userData.id,
            //     username: userData.username,
            //     email: userData.email,
            //     role: userData.role,
            //     password: userData.password,
            //     googleId: userData.googleId,
            //     otp: userData.otp,
            // };

            next();
        } catch (err:any) {
            res.status(403).json({
                message: "Invalid token",
                error: err.message,
            });
        }
    }

    restrictTo(...roles: Role[]) {
        return (req: AuthRequest, res: express.Response, next: express.NextFunction) => {
            const userRole = req.user?.role as Role;
    
            if (!roles.includes(userRole)) {
                return res.status(403).json({ message: "You don't have permission" });
            }
    
            next();
        };
    }
}    
export default new AuthMiddleware();
