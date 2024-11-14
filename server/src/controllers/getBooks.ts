import { NextFunction, Request, Response } from "express";
import BookRepository from "../model/BookRepository";
import { StatusCode } from "../types";

const repository = new BookRepository();

const getBooks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const books = await repository.find();
        res.status(StatusCode.Success).json(books);
        
    } catch (error) {
        next(error);
    }
};

export default getBooks;