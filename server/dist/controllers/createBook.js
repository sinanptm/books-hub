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
const validateBookData = (book) => {
    const missingFields = [];
    if (!book.title || book.title.trim() === '')
        missingFields.push("Title");
    if (!book.author || book.author.trim() === '')
        missingFields.push("Author");
    if (!book.description || book.description.trim() === '')
        missingFields.push("Description");
    return missingFields;
};
const createBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = req.body;
        const missingFields = validateBookData(book);
        if (missingFields.length > 0) {
            res.status(types_1.StatusCode.BadRequest).json({
                message: `Missing fields: ${missingFields.join(", ")}`
            });
            return;
        }
        const createdBook = yield repository.create(book);
        res.status(types_1.StatusCode.Created).json({
            message: "Book added successfully",
            book: createdBook
        });
    }
    catch (error) {
        next(error);
    }
});
exports.default = createBook;
