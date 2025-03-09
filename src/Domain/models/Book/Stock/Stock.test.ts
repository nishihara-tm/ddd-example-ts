import { Status, StatusEnum } from "Domain/models/Book/Stock/Status/Status"
import { Stock } from "Domain/models/Book/Stock/Stock"
import { StockId } from "Domain/models/Book/Stock/StockId/StockId"

jest.mock('nanoid', () => ({
    nanoid: () => 'test'
}))

describe('Stock', () => {

    describe('create', () => {
        it('デフォルト値で在庫を作成する', () => {
            const stock = Stock.create()

            expect(stock.stockId.equals(new StockId('test'))).toBeTruthy()
            expect(stock.status.equals(new Status(StatusEnum.OutOfStock))).toBeTruthy()
        })
    })

    describe('delete', () => {
        it('throw error', () => {
            expect(() => {
                const stock = Stock.create()
                stock.increaseQuantity(10)
                stock.delete()
            }).toThrow('削除するには在庫が0である必要が有ります')
        })
    })

    describe('increaseQuantity', () => {

        it('InStock', () => {
            const stock = Stock.create()
            stock.increaseQuantity(50)
            expect(stock.quantityAvailable.value).toBe(50)
            expect(stock.status.value).toBe(StatusEnum.InStock)
        })

        it('LowStock', () => {
            const stock = Stock.create()
            stock.increaseQuantity(5)
            expect(stock.quantityAvailable.value).toBe(5)
            expect(stock.status.value).toBe(StatusEnum.LowStock)
        })
    })
})