"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = require("../utils/response");
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    // Default error status and message
    const status = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return (0, response_1.sendResponse)(res, status, false, message);
};
exports.default = errorHandler;
