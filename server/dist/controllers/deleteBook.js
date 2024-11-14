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
const BookRepository_1 = __importDefault(require("../model/BookRepository"));
const types_1 = require("../types");
const repository = new BookRepository_1.default();
const deleteBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const idPattern = /^[a-f\d]{24}$/i;
        if (!idPattern.test(id)) {
            res.status(types_1.StatusCode.BadRequest).json({ message: "Invalid ID format" });
            return;
        }
        yield repository.delete(id);
        res.status(types_1.StatusCode.Success).json({ message: "Book has been deleted" });
    }
    catch (error) {
        next(error);
    }
});
exports.default = deleteBook;
