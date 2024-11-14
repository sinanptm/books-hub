import { NextFunction, Request, Response } from "express";
import BookRepository from "../model/BookRepository";
import { StatusCode } from "../types";

const repository = new BookRepository();

const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;

        const idPattern = /^[a-f\d]{24}$/i;
        if (!idPattern.test(id)) {
            res.status(StatusCode.BadRequest).json({ message: "Invalid ID format" });
            return;
        }

        await repository.delete(id);

        res.status(StatusCode.Success).json({ message: "Book has been deleted" });
    } catch (error) {
        next(error);
    }
};

export default deleteBook;