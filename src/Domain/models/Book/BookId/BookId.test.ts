import { BookId } from "Domain/models/Book/BookId/BookId";

describe('BookId', () => {
    test('valid', () => {
        expect(new BookId('1234567890').value).toBe('1234567890')
    })

    test('equals', () => {
        const book1 = new BookId('1234567890')
        const book2 = new BookId('1234567890')
        expect(book1.equals(book2)).toBeTruthy()
    })
})
