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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../database/models/userModel"));
class authMiddleware {
    isAuthenticated(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // get token from user
            const token = req.headers.authorization;
            if (!token || token === undefined || token === null) {
                res.status(403).json({
                    message: "token not provided"
                });
                return;
            }
            //verify token
            jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decoded) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    res.status(403).json({
                        message: "token not valid"
                    });
                }
                else {
                    try {
                        // check if that decoded object id user exist or not 
                        const userData = yield userModel_1.default.findByPk(decoded.id);
                        if (!userData) {
                            res.status(404).json({
                                message: "no user with that token"
                            });
                            return;
                        }
                        req.user = {
                            id: userData.id,
                            username: userData.username,
                            email: userData.email,
                            role: userData.role,
                            password: userData.password,
                            googleId: userData.googleId,
                            otp: userData.otp,
                        };
                        next();
                    }
                    catch (error) {
                        res.status(500).json({
                            message: "server/internal error",
                            error: error
                        });
                    }
                }
            }));
            //next
        });
    }
    restrictTo(...roles) {
        return (req, res, next) => {
            var _a;
            let userRole = (_a = req.user) === null || _a === void 0 ? void 0 : _a.role;
            if (!roles.includes(userRole)) {
                res.status(403).json({
                    message: "you don't have permission"
                });
            }
            else {
                next();
            }
        };
    }
}
exports.default = new authMiddleware();
