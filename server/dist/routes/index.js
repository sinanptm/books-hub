"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createBook_1 = __importDefault(require("../controllers/createBook"));
const getBooks_1 = __importDefault(require("../controllers/getBooks"));
const errorHandler_1 = __importDefault(require("../middleware/errorHandler"));
const deleteBook_1 = __importDefault(require("../controllers/deleteBook"));
const routes = (0, express_1.Router)();
routes.post('/', createBook_1.default);
routes.get("/", getBooks_1.default);
routes.delete('/:id', deleteBook_1.default);
routes.use(errorHandler_1.default);
exports.default = routes;
