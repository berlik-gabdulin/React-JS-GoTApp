export default class GotService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api/'
    }
    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }
    async getAllCharacters() {
        const res = await this.getResource(`characters?page=7&pageSize=10`);
        return res.map(this._transformCharacter);
    }
    async getCharacter(id) {
        const character = await this.getResource(`characters/${id}`);
        return this._transformCharacter(character);
    }

    //
    async getAllHouses() {
        const res = await this.getResource(`houses?page=1&pageSize=10`);
        return res.map(this._transformHouse);
    }
    async getHouse(id) {
        const house = await this.getResource(`houses/${id}`);
        return house.map(this._transformHouse);
    }

    //
    async getAllBooks() {
        const res = this.getResource(`books`);
        return res.map(this._transformBook);
    }
    async getBook(id) {
        const book = this.getResource(`books/${id}`);
        return book.map(this._transformBook);
    }

    _getItemKey(url) {
        const arr = url.split('/');
        const arrLength = arr.length;
        const key = arr[arrLength - 2] + '-' + arr[arrLength - 1];
        return key;
    }

    //
    _transformCharacter(char) {
        return {
            name: char.name,
            gender: char.gender,
            born: char.born,
            died: char.died,
            culture: char.culture,
            url: char.url
        }
    }

    _transformHouse(house) {
        return {
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overlord: house.overlord,
            ancestralWeapons: house.ancestralWeapons,
            url: house.url
        }
    }
    _transformBook(book) {
        return {
            name: book.name,
            numberOfPages: book.numberOfPages,
            publisher: book.publisher,
            released: book.released,
            url: book.url
        }
    }

}
