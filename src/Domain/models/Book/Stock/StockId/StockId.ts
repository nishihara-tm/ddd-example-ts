import { ValueObject } from "Domain/models/shared/ValueObject";
import { nanoid } from "nanoid";

type StockIdValue = string;

export class StockId extends ValueObject<StockIdValue, 'StockId'> {
    static readonly MIN_LENGTH = 1;
    static readonly MAX_LENGTH = 100;

    constructor(value: StockIdValue = nanoid()) {
        super(value)
    }

    protected validate(value: string): void {
        if (value.length < StockId.MIN_LENGTH || value.length > StockId.MAX_LENGTH) {
            throw('invalid length')
        }
    }
}