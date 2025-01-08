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
const userModel_1 = __importDefault(require("../database/models/userModel"));
const bcrypt = require('bcryptjs');
const adminSeeder = () => __awaiter(void 0, void 0, void 0, function* () {
    const [data] = yield userModel_1.default.findAll({
        where: {
            email: "admin@gmail.com"
        }
    });
    if (!data) {
        userModel_1.default.create({
            email: "admin@gmail.com",
            password: bcrypt.hashSync("admin", 10),
            username: "admin",
            role: "admin"
        });
        console.log("admin credentials seeded successfully");
    }
    else {
        console.log("admin credentials already seeded");
    }
});
exports.default = adminSeeder;
