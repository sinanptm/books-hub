'use client';

import { PlusCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { memo, useCallback, useState } from 'react';
import { IBook } from '@/types';
import { toast } from '@/hooks/use-toast';

const AddNewBook = ({ addBook, isLoading }: { addBook: (book: IBook) => Promise<IBook>; isLoading: boolean; }) => {
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
            //eslint-disable-next-line
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
                    <div className="group relative">
                        <label
                            htmlFor="title"
                            className="origin-start absolute top-1/2 block -translate-y-1/2 cursor-text px-1 text-sm text-muted-foreground/70 transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium has-[+input:not(:placeholder-shown)]:text-foreground"
                        >
                            <span className="inline-flex bg-background px-2">Title Of Book *</span>
                        </label>
                        <Input
                            id="title"
                            placeholder=""
                            value={newBook.title}
                            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                            disabled={isLoading}
                        />
                    </div>
                    <div className="group relative">
                        <label
                            htmlFor="author"
                            className="origin-start absolute top-1/2 block -translate-y-1/2 cursor-text px-1 text-sm text-muted-foreground/70 transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium has-[+input:not(:placeholder-shown)]:text-foreground"
                        >
                            <span className="inline-flex bg-background px-2">Author Name *</span>
                        </label>
                        <Input
                            placeholder=""
                            id="author"
                            value={newBook.author}
                            onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                            className="bg-background"
                            disabled={isLoading}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="description"
                        >
                            <span className="inline-flex bg-background px-2">Description About Book *</span>
                        </label>
                        <Textarea
                            placeholder=""
                            id="description"
                            value={newBook.description}
                            onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
                            className=""
                            disabled={isLoading}
                        />
                    </div>



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
        </Card >
    );
};

export default memo(AddNewBook);