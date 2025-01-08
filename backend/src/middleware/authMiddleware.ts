
import {NextFunction, Request,Response} from 'express';
import jwt from 'jsonwebtoken';
import User from '../database/models/userModel';
import { AuthRequest, Role } from '../types/authRequest';



class authMiddleware {
    async isAuthenticated(req:any,res:Response,next:NextFunction):Promise<void>{
        // get token from user
        const token = req.headers.authorization;
        if(!token || token === undefined || token === null){
            res.status(403).json({
                message:"token not provided"
            })
            return;
        }
        //verify token
        jwt.verify(token,process.env.JWT_SECRET as string,async(err:any,decoded:any)=>{
            if(err){
                res.status(403).json({
                    message:"token not valid"
                    })
            }else{
             try {
                   // check if that decoded object id user exist or not 
               const userData =  await User.findByPk(decoded.id);
               if(!userData){
                res.status(404).json({
                    message:"no user with that token"
                    })
                    return;
               }
               req.user= {
                id: userData.id,
                username: userData.username,
                email: userData.email,
                role: userData.role,
                password: userData.password,
                googleId: userData.googleId,
                otp: userData.otp,
            };
               next()
                
             } catch (error) {
                res.status(500).json({
                    message:"server/internal error",
                    error: error
                })
             }
            }

        })



        //next
    }
    restrictTo(...roles:Role[]){
        return (req:AuthRequest,res:Response,next:NextFunction)=>{
            let userRole = req.user?.role as Role;

            if(!roles.includes(userRole)){
                res.status(403).json({
                    message: "you don't have permission"
                })
            }else{
                next()
            }
           
        }

    }

}

export default new authMiddleware()