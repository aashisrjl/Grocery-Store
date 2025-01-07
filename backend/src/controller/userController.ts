import {request,Response} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../database/models/userModel';
import UserType from '../types/userType';

class AuthController{

    //regsiter
    public static async registerUser(req:Request,res:Response):Promise<void>{
        const { username,role,email,password}:UserType = req.body
        if(!username || !email || !password ){
            res.status(400).json({
                message: "please provide username,email,passsword"
            })
        }
        const user = await User.create({
            username,
            email,
            password:await bcrypt.hash(password,10),
        })

        res.status(200).json({
            message: "user registered",
            user
        })
    }

    //login

    public static async LoginUser(req:Request,res:Response):Promise<void>{
        const {email,password} = req.body

    }
}