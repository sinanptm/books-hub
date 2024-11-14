import { NextFunction, Request, Response } from "express";
import BookRepository from "../model/BookRepository";
import { IBook, StatusCode } from "../types";

const repository = new BookRepository();

const validateBookData = (book: Partial<IBook>) => {
    const missingFields: string[] = [];
    if (!book.title || book.title.trim() === '') missingFields.push("Title");
    if (!book.author || book.author.trim() === '') missingFields.push("Author");
    if (!book.description || book.description.trim() === '') missingFields.push("Description");
    return missingFields;
};

const createBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const book: Partial<IBook> = req.body;
        
        const missingFields = validateBookData(book);
        if (missingFields.length > 0) {
            res.status(StatusCode.BadRequest).json({ 
                message: `Missing fields: ${missingFields.join(", ")}`
            });
            return
        }

        const createdBook = await repository.create(book as IBook);
        res.status(StatusCode.Created).json({ 
            message: "Book added successfully", 
            book: createdBook 
        });
        
    } catch (error) {
        next(error);
    }
};

export default createBook;
