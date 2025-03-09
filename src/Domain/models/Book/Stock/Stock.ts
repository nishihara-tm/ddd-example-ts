import { QuantityAvailable } from "Domain/models/Book/Stock/QuantityAvailable/QuantityAvailable";
import { Status, StatusEnum } from "Domain/models/Book/Stock/Status/Status";
import { StockId } from "Domain/models/Book/Stock/StockId/StockId";

export class Stock {
    private constructor(
        private readonly _stockId: StockId,
        private _quantityAvailable: QuantityAvailable,
        private _status: Status
    ) {}

    static create() {
        const defaultStockId = new StockId()
        const defaultQuantityAvailable = new QuantityAvailable(0)
        const defaultStatus = new Status(StatusEnum.OutOfStock)

        return new Stock(
            defaultStockId, defaultQuantityAvailable, defaultStatus
        )
    }

    public delete() {
        if (this.status.value !== StatusEnum.OutOfStock) {
            throw new Error('削除するには在庫が0である必要が有ります')
        }

    }

    private changeStatus(newStatus: Status) {
        this._status = newStatus
    }

    private changeQuantityAvailable(newQuantityAvailable: QuantityAvailable) {
        this._quantityAvailable = newQuantityAvailable
    }

    increaseQuantity(amount: number) {
        if (amount < 0) {
            throw new Error('has to be more than 0')
        }

        const newQuantity = this.quantityAvailable.increment(amount).value

        if (newQuantity <= 10) {
            this.changeStatus(new Status(StatusEnum.LowStock))
        } else if (newQuantity > 10) {
            this.changeStatus(new Status(StatusEnum.InStock))
        }

        this.changeQuantityAvailable(new QuantityAvailable(newQuantity))
    }

    decreaseQuantity(amount: number) {
        if (amount < 0) {
            throw new Error('more than 0')
        }

        const newQuantity = this.quantityAvailable.decrement(amount).value

        if (newQuantity < 0) {
            throw new Error('more than 0')
        }

        if (newQuantity <= 10) {
            this.changeStatus(new Status(StatusEnum.LowStock))
        }

        if (newQuantity === 0) {
            this.changeStatus(new Status(StatusEnum.OutOfStock))
        }

        this.changeQuantityAvailable(new QuantityAvailable(newQuantity))
    }

    static reconstruct(
        stockId: StockId,
        quantityAvailable: QuantityAvailable,
        status: Status
    ) {
        return new Stock(stockId, quantityAvailable, status)
    }

    get stockId(): StockId {
        return this._stockId
    }

    get quantityAvailable(): QuantityAvailable {
        return this._quantityAvailable
    }

    get status(): Status {
        return this._status
    }
}