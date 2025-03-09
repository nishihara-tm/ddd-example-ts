import { BookDTO } from "Application/Book/BookDTO";
import { BookId } from "Domain/models/Book/BookId/BookId";
import { IBookRepository } from "Domain/models/Book/IBookRepository";

export class GetBookApplicationService {
    constructor(
        private bookRepository: IBookRepository
    ) {}

    async execute(isbn: string): Promise<BookDTO | null> {
        const book = await this.bookRepository.find(
            new BookId(isbn)
        )

        // このまま返却すると、インフラ層が直接Domain層を触れてしまうので、DTOが必要
        // return book
        return book ? new BookDTO(book) : null
    }
}