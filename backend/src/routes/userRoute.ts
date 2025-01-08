import express, { Router } from 'express';
import errorHandler from '../services/catchAsyncError';
import { UserController } from '../controller/userController'; // Import the named export
import passport from "../services/passportConfig";


const router: Router = express.Router();

router.route("/register").post(errorHandler(UserController.registerUser));
router.route("/login").post(errorHandler(UserController.loginUser));

// Google OAuth Login
router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google OAuth Callback
router.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/" }), UserController.googleCallback);

export default router;

