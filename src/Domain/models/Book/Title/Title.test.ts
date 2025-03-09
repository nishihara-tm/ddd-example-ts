import { Title } from "Domain/models/Book/Title/Title"

describe('Title', () => {

    it('valid', () => {
        const validTitle = 'hogehoge'
        const obj = new Title(validTitle)
        expect(obj.value).toBe(validTitle)
    })

    it ('invalid', () => {
        const invalidTitle = ''
        expect(() => {
            new Title(invalidTitle)
        }).toThrow('title length is wrong')
    })
})