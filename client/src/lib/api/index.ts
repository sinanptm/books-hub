import { IBook } from "@/types";
import axios from "axios";

const baseURL = "https://books-hub-fnso.onrender.com"; // http://localhost:8000

const instance = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json"
    }
});

export const createBook = async (book: IBook) => {
    const response = await instance.post<{ message: string, book: IBook; }>("/api", book);
    return response.data;
};

export const getBooks = async () => {
    const response = await instance.get<IBook[]>('/api');
    return response.data;
};

export const deleteBook = async (id: string) => {
    const response = await instance.delete<{ message: string; }>(`/api/${id}`);
    return response.data;
};