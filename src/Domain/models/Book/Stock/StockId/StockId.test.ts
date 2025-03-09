import { StockId } from "Domain/models/Book/Stock/StockId/StockId"

jest.mock('nanoid', () => ({
    nanoid: () => 'test'
}))

describe('StockId', () => {
    it('valid', () => {
        const id = new StockId()
        console.log('id.value', id.value)
        expect(id.value).toBe('test')
    })

    it('invalid', () => {
        expect(() => {
            const invalidId = ''
            new StockId(invalidId)
        }).toThrow('invalid length')
    })
})