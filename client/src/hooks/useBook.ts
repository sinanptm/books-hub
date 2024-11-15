import { useState, useEffect, useCallback } from "react";
import { IBook } from "@/types";
import { getBooks, createBook, deleteBook } from "@/lib/api";

export const useBook = () => {
  const [books, setBooks] = useState<IBook[]>([]);
  const [isLoading, setLoading] = useState(false);
  
  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getBooks();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const addBook = useCallback(async (book: IBook) => {
    const tempId = `temp-${Date.now()}`; 
    const newBook = { ...book, _id: tempId };
    
    
    setBooks(prevBooks => [...prevBooks, newBook]);
    
    try {
      setLoading(true);
      const { book: createdBook } = await createBook(book);
      
      setBooks(prevBooks => 
        prevBooks.map(b => b._id === tempId ? createdBook : b)
      );
      
      return createdBook;
    } catch (error) {
      setBooks(prevBooks => prevBooks.filter(b => b._id !== tempId));
      throw error;
    } finally {
      setLoading(false);
    }
  }, []); 

  const removeBook = useCallback(async (id: string) => {
    const bookToRemove = books.find(b => b._id === id);
    if (!bookToRemove) return;

    setBooks(prevBooks => prevBooks.filter(book => book._id !== id));

    try {
      setLoading(true);
      await deleteBook(id);
    } catch (error) {
      setBooks(prevBooks => [...prevBooks, bookToRemove]);
      throw error; 
    } finally {
      setLoading(false);
    }
  }, [books]);

  return { books, isLoading, addBook, removeBook, fetchBooks };
};