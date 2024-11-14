import { model, Schema } from "mongoose";
import { IBook } from "../types";

const bookSchema = new Schema<IBook>({
    title: {
        type: String,
        required: true,
        index: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
}, {
    versionKey: false,
    minimize: false
});

const Book = model("Book", bookSchema);
export default Book;