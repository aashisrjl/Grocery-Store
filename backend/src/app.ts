
import express,{Application,Request,Response} from 'express';
const app:Application = express()

const port = Number(process.env.SERVER_PORT || 3000)

app.use(express.urlencoded({extended:true}))
app.use(express.json())

import * as dotenv from 'dotenv';
dotenv.config();
import './database/connection'

app.get("/",(req:Request,res:Response)=>{
    res.send("Hello World")
})

const userRoute = require("./routes/userRoute")
app.use("/",userRoute)


app.listen(port,()=>{
    console.log("server is running on port:"+ port)
})