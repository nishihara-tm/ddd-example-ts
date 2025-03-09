import { QuantityAvailable } from "Domain/models/Book/Stock/QuantityAvailable/QuantityAvailable"

describe('QuantityAvailable', () => {
    it('valid', () => {
        const validNum = 100
        const q = new QuantityAvailable(validNum)
        expect(q.value).toBe(validNum)
    })

    it('invalid', () => {
        const invalidNum = -1
        expect(() => {
            new QuantityAvailable(invalidNum)
        }).toThrow('value error')
    })

    it('increment', () => {
        const q = new QuantityAvailable(10)
        expect(q.increment(10).value).toBe(20)
    })

    it('decrement', () => {
        const q = new QuantityAvailable(10)
        expect(q.decrement(5).value).toBe(5)
    })
})