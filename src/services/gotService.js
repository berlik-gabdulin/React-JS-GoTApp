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
        const key = arr[arrLength - 1];
        return key;
    }

    //
    _transformCharacter(char) {
        
        const noData = "no data:(";
        return {
            name: char.name || noData,
            gender: char.gender || noData,
            born: char.born || noData,
            died: char.died || noData,
            culture: char.culture || noData,
            url: char.url || noData,
            key: char.url.split('/')[char.url.split('/').length - 1]
        }
    }

    _transformHouse(house) {
        const noData = "no data:(";
        return {
            name: house.name || noData,
            region: house.region || noData,
            words: house.words || noData,
            titles: house.titles || noData,
            overlord: house.overlord || noData,
            ancestralWeapons: house.ancestralWeapons || noData,
            url: house.url || noData,
            key: house.url.split('/')[house.url.split('/').length - 1]
        }
    }
    _transformBook(book) {
        const noData = "no data:(";
        return {
            name: book.name || noData,
            numberOfPages: book.numberOfPages || noData,
            publisher: book.publisher || noData,
            released: book.released || noData,
            url: book.url || noData,
            key: book.url.split('/')[book.url.split('/').length - 1]
        }
    }

}
