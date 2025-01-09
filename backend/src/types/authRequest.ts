import { Request } from "express";

export interface AuthRequest extends Request {
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

export enum Role{
    Admin = 'admin',
    Customer = 'customer'
}
