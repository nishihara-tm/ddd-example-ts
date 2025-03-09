import { IncreaseBookStockApplicationService } from "Application/Book/IncreaseBookStockApplicationService/IncreaseBookStockApplicationService"
import { MockTransactionManager } from "Application/shared/MockTransactionManager"
import { BookId } from "Domain/models/Book/BookId/BookId"
import { InMemoryBookRepository } from "Infrastracture/InMemory/Book/InMemoryBookRepository"
import { bookTestDataCreator } from "Infrastracture/shared/Book/bookTestDataCreator"

describe('IncreaseBookStockApplicationService', () => {
    it('在庫を増やせる', async () => {
        const repository = new InMemoryBookRepository()
        const transactionManager = new MockTransactionManager()
        const service = new IncreaseBookStockApplicationService(
            repository,
            transactionManager
        )

        const bookId = '1234567890'
        await bookTestDataCreator(repository)({
            bookId,
            quantityAvailable: 0
        })

        const increaseAmount = 100;
        const command = {
            bookId,
            increaseAmount
        }

        await service.execute(command)

        const book = await repository.find(new BookId(bookId))
        expect(book?.quantityAvailable.value).toBe(increaseAmount)
    })

})