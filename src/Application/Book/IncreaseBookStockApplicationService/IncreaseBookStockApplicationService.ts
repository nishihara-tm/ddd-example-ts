import { ITransactionManager } from "Application/shared/ITransactionManager";
import { BookId } from "Domain/models/Book/BookId/BookId";
import { IBookRepository } from "Domain/models/Book/IBookRepository";

export type IncreaseBookStockCommand = {
    bookId: string,
    increaseAmount: number
}

export class IncreaseBookStockApplicationService {
    constructor(
        private bookRepository: IBookRepository,
        private transactionManager: ITransactionManager,
    ) {}

    async execute(command: IncreaseBookStockCommand) {
        await this.transactionManager.begin(async() => {
            const book = await this.bookRepository.find(new BookId(command.bookId))

            if(!book) {
                throw new Error('not exist')
            }

            book.increaseStock(command.increaseAmount)

            await this.bookRepository.update(book)
        })
    }
}