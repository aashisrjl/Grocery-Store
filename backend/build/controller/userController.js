"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel_1 = __importDefault(require("../database/models/userModel"));
class UserController {
    // Register
    static registerUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, role, email, password } = req.body;
            if (!username || !email || !password) {
                res.status(400).json({
                    message: "Please provide username, email, and password",
                });
                return;
            }
            const user = yield userModel_1.default.create({
                username,
                email,
                password: yield bcrypt.hash(password, 10),
            });
            res.status(200).json({
                message: "User registered",
                user,
            });
        });
    }
    // Login
    static loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            if (!email || !password) {
                res.status(400).json({
                    message: "Please provide email and password",
                });
                return;
            }
            const user = yield userModel_1.default.findOne({ where: { email } });
            if (!user) {
                res.status(400).json({
                    message: "User not found",
                });
                return;
            }
            const isMatch = yield bcrypt.compare(password, user.password);
            if (!isMatch) {
                res.status(400).json({
                    message: "Invalid credentials",
                });
                return;
            }
            //cookies 
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN,
            });
            res.cookie("token", token, {
                httpOnly: true,
            });
            res.status(200).json({
                message: "Login success",
                user: user.username,
                email: user.email,
                role: user.role,
                token: token
            });
            // Add logic here for login (this part was incomplete in your code)
            res.status(200).json({
                message: "Login logic is pending",
            });
        });
    }
}
exports.UserController = UserController;
