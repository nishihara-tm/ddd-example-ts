import { Book } from "Domain/models/Book/Book";
import { BookId } from "Domain/models/Book/BookId/BookId";
import { IBookRepository } from "Domain/models/Book/IBookRepository";

export class InMemoryBookRepository implements IBookRepository{
    public DB: {
        [id: string]: Book;
    } = {}

    async save(book: Book) {
        this.DB[book.bookId.value] = book
    }

    async update(book: Book) {
        this.DB[book.bookId.value] = book
    }

    async delete(bookId: BookId) {
        delete this.DB[bookId.value]
    }

    async find(bookId: BookId) {
        const book = Object.entries(this.DB).find(([key]) => {
            return bookId.value === key.toString()
        })
        return book ? book[1] : null;
    }
}