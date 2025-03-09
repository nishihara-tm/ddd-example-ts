import { ValueObject } from "Domain/models/shared/ValueObject";

export class BookId extends ValueObject<string, 'BookId'> {
    static MAX_LENGTH = 13
    static MIN_LENGTH = 10


    constructor(value: string) {
        super(value)
    }

    protected validate(value: string) {
        if(value) {
            console.log(value)
        }
        return true
    }

    toISBN(): string {
      if (this._value.length === 10) {
        // ISBNが10桁の場合の、'ISBN' フォーマットに変換します。
        const groupIdentifier = this._value.substring(0, 1); // 国コードなど（1桁）
        const publisherCode = this._value.substring(1, 3); // 出版者コード（2桁）
        const bookCode = this._value.substring(3, 9); // 書籍コード（6桁）
        const checksum = this._value.substring(9); // チェックディジット（1桁）

        return `ISBN${groupIdentifier}-${publisherCode}-${bookCode}-${checksum}`;
      } else {
        // ISBNが13桁の場合の、'ISBN' フォーマットに変換します。
        const isbnPrefix = this._value.substring(0, 3); // 最初の3桁 (978 または 979)
        const groupIdentifier = this._value.substring(3, 4); // 国コードなど（1桁）
        const publisherCode = this._value.substring(4, 6); // 出版者コード（2桁）
        const bookCode = this._value.substring(6, 12); // 書籍コード（6桁）
        const checksum = this._value.substring(12); // チェックディジット（1桁）

        return `ISBN${isbnPrefix}-${groupIdentifier}-${publisherCode}-${bookCode}-${checksum}`;
      }
    }

    get value(): string {
        return this._value
    }
}