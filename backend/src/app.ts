import dotenv from 'dotenv';
dotenv.config(); 
import express,{Application,Request,Response} from 'express';
const app:Application = express()
const port:number = Number(process.env.SERVER_PORT || 3000);
const cookieParser = require('cookie-parser');
import jwt from 'jsonwebtoken';

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser());
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
console.log("clientID",process.env.O_CLIENT_ID)
console.log("clientSecret",process.env.O_CLIENT_SECRET)
console.log("callbackURL",process.env.O_CALLBACK_URL)
console.log("jwttoken",process.env.JWT_SECRET)


// // google login ===============================================
// import passport from 'passport';
// import User from './database/models/userModel';
// app.use(passport.initialize());
// app.use(passport.session());

// passport.serializeUser(function(user, cb) {
//     cb(null, user);
// });

// passport.deserializeUser(function(obj, cb) {
//     cb(null, obj);
// });

// // Google OAuth2 Strategy
// const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// passport.use(new GoogleStrategy({
//     clientID: process.env.O_CLIENT_ID,
//     clientSecret: process.env.O_CLIENT_SECRET,
//     callbackURL: process.env.O_CALLBACK_URL ||"http://localhost:3000/auth/google/callback"
// }, async function(accessToken:string, refreshToken:string, profile:any, done:any) {
//     userProfile:UserProfile = profile;
//     return done(null, userProfile);
   
// }));

// // Routes
// app.get("/auth/google", passport.authenticate('google', {
//     scope: ['profile', 'email']
// }));

// app.get("/auth/google/callback", passport.authenticate('google', {
//     failureRedirect: "http://localhost:3000"
// }), async function(req, res) {
//     try {
//         // Check for duplicate email
//         const duplicateEmail = await User.findOne({
//             where: {
//                 email: userProfile.emails[0].value
//             }
//         });

//         if (duplicateEmail) {
//                // Generate JWT token
//             const token = jwt.sign({ id: duplicateEmail.id }, process.env.JWT_SECRET, {
//             expiresIn: '30d'
//         });
//             res.cookie('token', token);

//         }else{

//         // Create a new user in the database
//         const data = await User.create({
//             username: userProfile.displayName,
//             email: userProfile.emails[0].value,
//             googleId: userProfile.id
//         });

//         // Generate JWT token
//         const token = jwt.sign({ id: data.id }, process.env.JWT_SECRET, {
//             expiresIn: '30d'
//         });

//         // Set the JWT token in cookies
//         res.cookie('token', token);
//         }
//     } catch (error) {
//         console.log(error);
//     }
//     });

//     //google login ends here




app.listen(port,()=>{
    console.log("server is running on port:"+ port)
})