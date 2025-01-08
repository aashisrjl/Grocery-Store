const passport = require("passport");
// import { OAuth2Strategy as GoogleStrategy } from "passport-google-oauth20";
const {GoogleStrategy} = require('passport-google-oauth20');
import dotenv from "dotenv";

dotenv.config();

let userProfile: any;

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID!,
            clientSecret: process.env.CLIENT_SECRET!,
            callbackURL: "http://localhost:3000/auth/google/callback",
        },
        async (accessToken:any, refreshToken:any, profile:any, done:any) => {
            userProfile = profile;
            return done(null, userProfile);
        }
    )
);

export default passport;
