"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.storage = exports.multer = void 0;
const multer = require('multer');
exports.multer = multer;
const path_1 = __importDefault(require("path"));
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const allowedFileTypes = ['image/png', 'image/jpeg', 'image/jpg'];
        if (!allowedFileTypes.includes(file.mimetype)) {
            cb(new Error('filetype must be jpg, png, or jpeg'));
            return;
        }
        console.log("filemulter:", file);
        //location of uploads folder
        cb(null, path_1.default.join(__dirname, '../uploads'));
        // cb(null,'./src/uploads');
    },
    filename: function (req, file, cb) {
        const data = Date.now();
        cb(null, data + '-' + file.originalname);
    }
});
exports.storage = storage;
const upload = multer({ storage });
exports.upload = upload;
