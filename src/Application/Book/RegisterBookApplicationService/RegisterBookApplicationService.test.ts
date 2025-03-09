import { RegisterBookApplicationService, RegisterBookCommand } from "Application/Book/RegisterBookApplicationService/RegisterBookApplicationService"
import { MockTransactionManager } from "Application/shared/MockTransactionManager"
import { Book } from "Domain/models/Book/Book"
import { BookId } from "Domain/models/Book/BookId/BookId"
import { Price } from "Domain/models/Book/Price/Price"
import { Title } from "Domain/models/Book/Title/Title"
import { InMemoryBookRepository } from "Infrastracture/InMemory/Book/InMemoryBookRepository"
describe('RegisterBookApplicationService', () => {
    it('重複書籍が存在しない場合に正常に作成できる', async() => {
        const repository = new InMemoryBookRepository()
        const mockTransactionManager = new MockTransactionManager()

        const registerBookApplicationService = new RegisterBookApplicationService(
            repository,
            mockTransactionManager
        )

        const command: RegisterBookCommand = {
            isbn: '1234567890',
            title: 'hogehoge',
            priceAmount: 100
        }

        await registerBookApplicationService.execute(command)
        const createBook = await repository.find(new BookId(command.isbn))
        expect(createBook).not.toBeNull()
    })

    it('重複書籍が存在する場合に正常に作成できない', async() => {
        const repository = new InMemoryBookRepository()
        const mockTransactionManager = new MockTransactionManager()

        const registerBookApplicationService = new RegisterBookApplicationService(
            repository,
            mockTransactionManager
        )

        const command: RegisterBookCommand = {
            isbn: '1234567890',
            title: 'hogehoge',
            priceAmount: 100
        }

        await repository.save(
            Book.create(
                new BookId(command.isbn),
                new Title(command.title),
                new Price({amount: command.priceAmount, currency: "JPY"})
            )
        )

        expect(
            registerBookApplicationService.execute(command)
        ).rejects.toThrow('already exist')

    })
})