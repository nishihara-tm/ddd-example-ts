import { BookId } from "Domain/models/Book/BookId/BookId";
import { Book } from "Domain/models/Book/Book";

export interface IBookRepository {
    save(book: Book): Promise<void>;
    update(book: Book): Promise<void>;
    delete(bookId: BookId): Promise<void>;
    find(bookId: BookId): Promise<Book | null>;
}