import * as dotenv from 'dotenv';
dotenv.config();

import express,{Application,Request,Response} from 'express';
const app:Application = express()

const port:number = Number(process.env.SERVER_PORT || 3000)

app.use(express.urlencoded({extended:true}))
app.use(express.json())


import './database/connection'
import adminSeeder from './utils/adminSeeder';
import CategoryController  from './controller/categoryController';

adminSeeder()
CategoryController.seedCategory();

app.get("/",(req:Request,res:Response)=>{
    res.send("Hello World")
})

const userRoute = require("./routes/userRoute")
app.use("/",userRoute)


app.listen(port,()=>{
    console.log("server is running on port:"+ port)
})