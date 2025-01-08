import dotenv from 'dotenv';
dotenv.config(); 
import express,{Application,Request,Response} from 'express';
const app:Application = express()
const port:number = Number(process.env.SERVER_PORT || 3000);
const cookieParser = require('cookie-parser');

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser());

import passport from './services/passportConfig';
app.use(passport.initialize());
//database connection
import './database/connection'

//import admin seeder
import adminSeeder from './utils/adminSeeder';
adminSeeder();

//import category controller
import CategoryController  from './controller/categoryController';
CategoryController.seedCategory();

app.get("/",(req:Request,res:Response)=>{
    res.send("Hello World")
})

import userRoute from './routes/userRoute'
app.use("", userRoute)


app.listen(port,()=>{
    console.log("server is running on port:"+ port)
})