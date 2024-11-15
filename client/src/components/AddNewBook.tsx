'use client';

import { PlusCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { memo, useCallback, useState } from 'react';
import { IBook } from '@/types';
import { toast } from '@/hooks/use-toast';

const AddNewBook = ({ addBook, isLoading }: { addBook: (book: IBook) => {}; isLoading: boolean; }) => {
    const [newBook, setNewBook] = useState<IBook>({
        title: '',
        author: '',
        description: ''
    });

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newBook.title?.trim() || !newBook.author?.trim() || !newBook.description?.trim()) {
            toast({
                title: "Validation Error",
                description: "Please fill in all fields",
                variant: "destructive"
            });
            return;
        }

        try {
            await addBook(newBook);
            toast({
                title: "Success",
                description: "Book added successfully",
                variant: "default"
            });
            setNewBook({ title: '', author: '', description: '' });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to add book. Please try again.",
                variant: "destructive"
            });
        }
    }, [newBook, addBook]);

    return (
        <Card className="mb-8 bg-secondary">
            <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Input
                        placeholder="Title"
                        value={newBook.title}
                        onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                        className="bg-background"
                        disabled={isLoading}
                    />
                    <Input
                        placeholder="Author"
                        value={newBook.author}
                        onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                        className="bg-background"
                        disabled={isLoading}
                    />
                    <Textarea
                        placeholder="Description"
                        value={newBook.description}
                        onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
                        className="bg-background resize-none"
                        disabled={isLoading}
                    />
                    <Button
                        type="submit"
                        className="bg-primary text-primary-foreground"
                        disabled={isLoading}
                    >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        {isLoading ? 'Adding...' : 'Add Book'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default memo(AddNewBook);