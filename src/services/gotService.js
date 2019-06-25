export default class GotService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api/'
    }
    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }
    getAllCharacters = async () => {
        const res = await this.getResource(`/characters?page=7&pageSize=10`);
        return res.map(this._transformCharacter);
    }
    getCharacter = async (id) => {
        const character = await this.getResource(`characters/${id}`);
        return this._transformCharacter(character);
    }

    //
    getAllHouses = async () => {
        const res = await this.getResource(`/houses?page=1&pageSize=10`);
        return res.map(this._transformHouse);
    }
    getHouse = async (id) => {
        const house = await this.getResource(`/houses/${id}`);
        return this._transformHouse(house);
    }

    //
    getAllBooks = async () => {
        const res = await this.getResource(`/books/`);
        return res.map(this._transformBook);
    }
    getBook = async (id) => {
        const book = await this.getResource(`books/${id}`);
        return this._transformBook(book);
    }

    //
    _transformCharacter = (char) => {
        
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

    _transformHouse = (house) => {
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
    _transformBook = (book) => {
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
