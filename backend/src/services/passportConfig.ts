const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
import dotenv from "dotenv";

dotenv.config();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.O_CLIENT_ID!,
            clientSecret: process.env.O_CLIENT_SECRET!,
            callbackURL: process.env.O_CALLBACK_URL || "http://localhost:3000/auth/google/callback",
            passReqToCallback: true, // Pass the entire request if needed
            session: false, // Disable sessions
        },
        async (accessToken: string, refreshToken: string, profile: any, done:Function) => {
            try {
                // Perform any custom logic with the profile (e.g., saving the user)
                return done(null, profile); // This will pass the user profile
            } catch (error) {
                return done(error, null);
            }
        }
    )
);
// Serialize and deserialize the user if needed
passport.serializeUser((user: any, done: any) => {
  done(null, user); // Serialize the entire profile or user data to store in the session
});

passport.deserializeUser((user: any, done: any) => {
  done(null, user); // Deserialize the user to retrieve from the session
});

export default passport;

