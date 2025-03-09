import { Book } from "Domain/models/Book/Book";
import { BookId } from "Domain/models/Book/BookId/BookId";
import { Price } from "Domain/models/Book/Price/Price";
import { QuantityAvailable } from "Domain/models/Book/Stock/QuantityAvailable/QuantityAvailable";
import { Status, StatusEnum } from "Domain/models/Book/Stock/Status/Status";
import { Stock } from "Domain/models/Book/Stock/Stock";
import { StockId } from "Domain/models/Book/Stock/StockId/StockId";
import { Title } from "Domain/models/Book/Title/Title";

jest.mock('nanoid', () => ({
    nanoid: () => 'test'
}));



describe('Book', () => {
    const bookId = new BookId('1234567890')
    const title = new Title('title')
    const price = new Price({amount: 1000, currency: 'JPY'})
    const stockId = new StockId('test')
    const quantityAvailable = new QuantityAvailable(10)
    const status = new Status(StatusEnum.InStock)

    const stock = Stock.reconstruct(stockId, quantityAvailable, status)

    describe('create', () => {
        it('default', () => {
            const book = Book.create(bookId, title, price)
            expect(book.bookId.equals(bookId)).toBeTruthy()
            expect(book.title.equals(title)).toBeTruthy()
            expect(book.price.equals(price)).toBeTruthy()
            expect(book.quantityAvailable.value).toBe(0)
            expect(book.status.value).toBe(StatusEnum.OutOfStock)
        })
    })

    describe('delete', () => {
        it('在庫がない場合はエラーを投げない', () => {
            const book = Book.create(bookId, title, price)
            expect(() => {
                book.delete()
            }).not.toThrow()
        })

        it('在庫有りの場合はエラーを投げる', () => {
            const book = Book.create(bookId, title, price)
            book.increaseStock(100)
            expect(() => {
                book.delete()
            }).toThrow('削除するには在庫が0である必要が有ります')
        })
    })

    describe('isSaleable', () => {
        const book = Book.create(bookId, title, price)
        it('在庫がない場合は売れないこと', () => {
            expect(book.isSaleable()).toBeFalsy()
        })

        it('在庫がある場合は売れること', () => {
            book.increaseStock(10)
            expect(book.isSaleable()).toBeTruthy()
        })
    })

    describe('increaseStock', () => {
        it('stock.increaseQuantity is called', () => {
            const book = Book.reconstruct(bookId, title, price, stock)
            const spy = jest.spyOn(stock, "increaseQuantity")
            book.increaseStock(10)
            expect(spy).toHaveBeenCalled()
        })
    })

    describe('decreaseStock', () => {
        it('stock.decreaseQuantity is called', () => {
            const book = Book.reconstruct(bookId, title, price, stock)
            const spy = jest.spyOn(stock, "decreaseQuantity")
            book.decreaseStock(10)
            expect(spy).toHaveBeenCalled()
        })
    })
})
