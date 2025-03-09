import { GetBookApplicationService } from "Application/Book/GetBookApplicationService/GetBookApplicationService"
import { Book } from "Domain/models/Book/Book"
import { BookId } from "Domain/models/Book/BookId/BookId"
import { Price } from "Domain/models/Book/Price/Price"
import { Title } from "Domain/models/Book/Title/Title"
import { InMemoryBookRepository } from "Infrastracture/InMemory/Book/InMemoryBookRepository"

describe('GetBookApplicationService', () => {
    it('指定したIDの本が取得できる', async() => {
        const repository = new InMemoryBookRepository()
        const service = new GetBookApplicationService(repository)

        const isbn = '1234567890'

        await repository.save(
            Book.create(
                new BookId(isbn),
                new Title('hoge'),
                new Price({amount: 100, currency: "JPY"})
            )
        )

        const book = await service.execute(isbn)
        expect(book?.bookId).toBe(isbn)
        expect(book?.title).toBe('hoge')
    })

    it('指定した本は存在しない', async() => {
        const repository = new InMemoryBookRepository()
        const service = new GetBookApplicationService(repository)

        const isbn = '1234567890'
        const book = await service.execute(isbn)

        expect(book).toBeNull()
    })
})