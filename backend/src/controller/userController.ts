import { Request, Response } from 'express';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
import User from '../database/models/userModel';
import { AuthRequest } from '../types/authRequest';



class UserController {
    // Register
    public static async registerUser(req:Request, res: Response): Promise<void> {
        const { username, role, email, password }: any = req.body;
        if (!username || !email || !password) {
            res.status(400).json({
                message: "Please provide username, email, and password",
            });
            return;
        }
        const alreadyExituser = await User.findOne({ where: { email } });
        if (alreadyExituser) {
            res.status(400).json({
                message: "User with that email already exists",
            });
            return;
        }

        const user = await User.create({
            username,
            email,
            password: await bcrypt.hash(password, 10),
        });

        res.status(200).json({
            message: "User registered",
            user,
        });
    }

    // Login
    public static async loginUser(req: Request, res: Response): Promise<void> {
        const { email, password}: any = req.body;
        if(!email || !password){
            res.status(400).json({
                message: "Please provide email and password",
                });
                return;
        }
        const user = await User.findOne({ where: { email } });
        if (!user) {
            res.status(400).json({
                message: "User not found",
                });
                return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({
                message: "Invalid credentials",
                });
                return;
            }
            //cookies 
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
                expiresIn: process.env.JWT_EXPIRES_IN,
            });
            res.cookie("token", token, {
                httpOnly: true,
            });
            res.status(200).json({
                message: "Login success",
                user: user.username,
                email: user.email,
                role: user.role,
                token: token
            })

    }

    // public static async googleCallback(req: any, res: Response): Promise<void> {
    //     // Check if `req.user` is undefined
    //     if (!req.user || !req.user.emails || !req.user.emails[0]?.value) {
    //         res.status(400).json({ message: "Invalid Google user data" });
    //         return;
    //     }

    //     const email = req.user.emails[0].value;
    //     let token: string;

    //     // Check for duplicate email
    //     const duplicateEmail = await User.findOne({ where: { email } });

    //     if (duplicateEmail) {
    //         // Generate JWT token
    //         token = jwt.sign({ id: duplicateEmail.id }, process.env.JWT_SECRET as string, {
    //             expiresIn: process.env.JWT_EXPIRES_IN,
    //         });
    //     } else {
    //         // Create a new user in the database
    //         const data = await User.create({
    //             username: req.user.displayName,
    //             email,
    //             googleId: req.user.id,
    //         });

    //         // Generate JWT token
    //         token = jwt.sign({ id: data.id }, process.env.JWT_SECRET as string, {
    //             expiresIn: "30d",
    //         });
    //     }

    //     // Set the JWT token in cookies
    //     res.cookie("token", token);
    //     res.status(200).json({
    //         message: "Login success",
    //         token,
    //     });
    // }
}

export { UserController }; // Use named export
