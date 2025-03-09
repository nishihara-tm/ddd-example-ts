import { BookId } from "Domain/models/Book/BookId/BookId";
import { Price } from "Domain/models/Book/Price/Price";
import { StatusEnum } from "Domain/models/Book/Stock/Status/Status";
import { Stock } from "Domain/models/Book/Stock/Stock";
import { StockId } from "Domain/models/Book/Stock/StockId/StockId";
import { Title } from "Domain/models/Book/Title/Title";

export class Book {
    private constructor(
        private readonly _bookId: BookId,
        private _title: Title,
        private _price: Price,
        private readonly _stock: Stock
    ) {}

    static create(bookId: BookId, title: Title, price: Price) {
        return new Book(bookId, title, price, Stock.create());
    }

    static reconstruct(bookId: BookId, title: Title, price: Price, stock: Stock) {
        return new Book(bookId, title, price, stock);
    }

    delete() {
        this._stock.delete()
    }

    changeTitle(newTitle: Title) {
        this._title = newTitle
    }

    changePrice(newPrice: Price) {
        this._price = newPrice
    }

    isSaleable() {
        return (
            this._stock.quantityAvailable.value > 0 && 
            this._stock.status.value !== StatusEnum.OutOfStock
        )
    }

    increaseStock(amount: number) {
        this._stock.increaseQuantity(amount)
    }

    decreaseStock(amount: number) {
        this._stock.decreaseQuantity(amount)
    }

    get bookId(): BookId {
        return this._bookId
    }

    get stockId(): StockId {
        return this._stock.stockId
    }

    get title(): Title {
        return this._title
    }

    get price(): Price {
        return this._price
    }

    get quantityAvailable() {
        return this._stock.quantityAvailable;
    }

    get status() {
        return this._stock.status
    }
}