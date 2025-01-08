"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const catchAsyncError_1 = __importDefault(require("../services/catchAsyncError"));
const userController_1 = require("../controller/userController"); // Import the named export
const router = express_1.default.Router();
router.route("/register").post((0, catchAsyncError_1.default)(userController_1.UserController.registerUser));
router.route("/login").post((0, catchAsyncError_1.default)(userController_1.UserController.loginUser));
exports.default = router;
