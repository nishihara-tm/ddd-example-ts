import { ValueObject } from "Domain/models/shared/ValueObject";

type QuantityAvailableValue = number;
export class QuantityAvailable extends ValueObject<QuantityAvailableValue, 'QuantityAvailable'> {
    static readonly MIN = 0
    static readonly MAX = 100
    constructor(value: QuantityAvailableValue) {
        super(value)
    }

    protected validate(value: QuantityAvailableValue): void {
        if(value < QuantityAvailable.MIN || value > QuantityAvailable.MAX) {
            throw new Error('value error')
        }
    }

    increment(amount: number): QuantityAvailable {
        const newValue = this._value + amount
        return new QuantityAvailable(newValue)
    }

    decrement(amount: number): QuantityAvailable {
        const newValue = this._value - amount
        return new QuantityAvailable(newValue)
    }
}