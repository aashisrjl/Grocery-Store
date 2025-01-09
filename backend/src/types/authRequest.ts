
import { Request } from 'express';
import User from '../database/models/userModel';



export interface AuthRequest extends Request {

    user?: User;

}


export enum Role{
    Admin = 'admin',
    Customer = 'customer'
}
