"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = Number(process.env.SERVER_PORT || 3000);
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
console.log("serverport", process.env.SERVER_PORT);
//database connection
require("./database/connection");
//import admin seeder
const adminSeeder_1 = __importDefault(require("./utils/adminSeeder"));
(0, adminSeeder_1.default)();
//import category controller
const categoryController_1 = __importDefault(require("./controller/categoryController"));
categoryController_1.default.seedCategory();
app.get("/", (req, res) => {
    res.send("Hello World");
});
const userRoute_1 = __importDefault(require("./routes/userRoute"));
app.use("", userRoute_1.default);
app.listen(port, () => {
    console.log("server is running on port:" + port);
});
