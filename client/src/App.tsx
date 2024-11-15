'use client';

import { Trash2, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useBook } from '@/hooks/useBook';
import AddNewBook from './components/AddNewBook';
import { memo, useCallback } from 'react';

const App = () => {
  const { books, removeBook, isLoading, addBook } = useBook();

  const handleDelete = useCallback(async (id: string) => {
    await removeBook(id);
  }, [removeBook]);

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary">Book Management App</h1>

      <AddNewBook addBook={addBook} isLoading={isLoading} />

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {books.map((book) => (
          <Card key={book._id} className="overflow-hidden transition-all hover:shadow-lg">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-1">{book.title}</h3>
                  <p className="text-sm text-muted-foreground flex items-center">
                    <User className="mr-1 h-4 w-4" /> {book.author}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(book._id!)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-3">{book.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default memo(App);