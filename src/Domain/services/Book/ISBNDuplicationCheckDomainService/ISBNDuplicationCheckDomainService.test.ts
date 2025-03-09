import { Book } from "Domain/models/Book/Book";
import { BookId } from "Domain/models/Book/BookId/BookId";
import { Price } from "Domain/models/Book/Price/Price";
import { Title } from "Domain/models/Book/Title/Title";
import { ISBNDuplicationCheckDomainService } from "Domain/services/Book/ISBNDuplicationCheckDomainService/ISBNDuplicationCheckDomainService";
import { InMemoryBookRepository } from "Infrastracture/InMemory/Book/InMemoryBookRepository";

describe('ISBNDuplicationCheckDomainService', () => {
    let isbnDuplicationCheckDomainService: ISBNDuplicationCheckDomainService;
    let inMemoryBookRepository: InMemoryBookRepository

    beforeEach(() => {
        inMemoryBookRepository = new InMemoryBookRepository()
        isbnDuplicationCheckDomainService = new ISBNDuplicationCheckDomainService(
            inMemoryBookRepository
        )
    })

    test('ISBNが重複していない場合は、Falseを返す', async() => {
        const bookId = new BookId('1234567890')
        const result = await isbnDuplicationCheckDomainService.execute(bookId)
        expect(result).toBeFalsy()
    })

    test('重複がある場合はTrueを返す', async() => {
        const bookId = new BookId('1234567890')
        const title = new Title('hogehoge')
        const price = new Price({
            amount: 1000,
            currency: 'JPY'
        })

        const book = Book.create(bookId, title, price)
        inMemoryBookRepository.save(book)

        const result = await isbnDuplicationCheckDomainService.execute(bookId)
        expect(result).toBeTruthy()
    })
})