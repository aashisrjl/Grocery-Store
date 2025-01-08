"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch((err) => {
            res.status(500).json({
                message: "Internal Server Error",
                error: err.message,
            });
        });
    };
};
exports.default = errorHandler;
