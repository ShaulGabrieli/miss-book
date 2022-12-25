import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'


const BOOK_KEY = 'bookDB'
_createBooks()

export const bookService = {
    query,
    get,
    save,
    getEmptyCar,
    getDefaultFilter,
}

function query(filterBy = getDefaultFilter()) {
    return storageService.query(BOOK_KEY).then((books) => {
        if (filterBy.txt) {
            const regex = new RegExp(filterBy.txt, 'i')
            books = books.filter((book) => regex.test(book.title))
        }
        if (filterBy.price) {
            books = books.filter(book => book.listPrice.amount >= filterBy.price)
        }
        return books
    })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)

}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, books)
    } else {
        return storageService.post(BOOK_KEY, books)
    }
}

function getEmptyCar(vendor = '', maxSpeed = '') {
    return { id: '', vendor, maxSpeed }
}

function getDefaultFilter() {
    return { txt: '', price: '' }
}



function _createBook(vendor, maxSpeed = 250) {
    const car = getEmptyCar(vendor, maxSpeed)
    car.id = utilService.makeId()
    return car
}


function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = [
            {
                id: 'OXeMG8wNskc',
                title: 'metus hendrerit',
                description: 'placerat nisi sodales suscipit tellus',
                thumbnail: '../assets/img/book_noun_001_01679.jpg',
                listPrice: {
                    amount: 109,
                    currencyCode: 'EUR',
                    isOnSale: false,
                },
            },
            {
                id: 'OXeMG8wNsk4',
                title: 'Harry Potter',
                description: 'placerat nisi sodales suscipit tellus',
                thumbnail: '../assets/img/book_noun_001_01679.jpg',
                listPrice: {
                    amount: 150,
                    currencyCode: 'EUR',
                    isOnSale: false,
                },
            },
            {
                id: 'OXeMG8wNs34',
                title: 'The C programing',
                description: 'placerat nisi sodales suscipit tellus',
                thumbnail: '../assets/img/book_noun_001_01679.jpg',
                listPrice: {
                    amount: 63,
                    currencyCode: 'EUR',
                    isOnSale: false,
                },
            },
        ]

        utilService.saveToStorage(BOOK_KEY, books)
    }
}