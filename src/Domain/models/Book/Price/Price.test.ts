import { Price } from "Domain/models/Book/Price/Price"

describe('Price', () => {
    it('valid Price', () => {
        const validAmount = 500;
        const price = new Price({amount: validAmount, currency: 'JPY'})
        expect(price.amount).toBe(validAmount)
        expect(price.currency).toBe('JPY')
    })

    it('throw error', () => {
        const invalidPrice = 0
        expect(() => {
            new Price({amount: invalidPrice, currency: 'JPY'})
        }).toThrow(`price has to be between ${Price.MIN} and ${Price.MAX}`)
    })
})