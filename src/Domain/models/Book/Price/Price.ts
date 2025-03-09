import { ValueObject } from "Domain/models/shared/ValueObject";

interface PriceValue {
    amount: number;
    currency: 'JPY'
}

export class Price extends ValueObject<PriceValue, 'Price'> {
    static readonly MAX = 1000000;
    static readonly MIN = 1;

    constructor(value: PriceValue) {
        super(value)
    }

    protected validate(value: PriceValue): void {
        if (value.currency !== 'JPY') {
            throw new Error('現在は日本円のみを扱います。');
        }

        if (value.amount < Price.MIN || value.amount > Price.MAX) {
            throw new Error(
                `price has to be between ${Price.MIN} and ${Price.MAX}`
            )
        }
    }

    get amount(): PriceValue['amount'] {
        return this.value.amount
    }

    get currency(): PriceValue['currency'] {
        return this.value.currency
    }
}