import {Request,Response} from 'express';

const errorHandler = (fn:Function)=>{
    return (req:Request,res:Response)=>{
        fn(req,res).catch((err:Error)=>{
            return res.status(500).json({
                message:"server/internal error",
                errorMessage: err.message
            })
        })
    }
}
export default errorHandler;