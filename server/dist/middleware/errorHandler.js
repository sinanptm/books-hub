"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const errorHandler = (error, req, res, next) => {
    const message = error instanceof Error ? error.message : "Unknown error occurred";
    res.status(types_1.StatusCode.InternalServerError).json({ message });
};
exports.default = errorHandler;
