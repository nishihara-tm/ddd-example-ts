import { Status, StatusEnum } from "Domain/models/Book/Stock/Status/Status"

describe('Status', () => {
    it('valid', () => {
        expect(new Status(StatusEnum.InStock).value).toBe(StatusEnum.InStock)
        expect(new Status(StatusEnum.OutOfStock).value).toBe(StatusEnum.OutOfStock)
        expect(new Status(StatusEnum.LowStock).value).toBe(StatusEnum.LowStock)
    })
    
})