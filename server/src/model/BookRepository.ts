import { IBook } from "../types";
import Book from "./Book";

export default class BookRepository {
    private model = Book;

    public async create(book: IBook) {
        return await this.model.create(book);
    }
}