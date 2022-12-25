const { useState, useEffect } = React

import { bookService } from '../services/book.service.js'
import { BookList } from '../cmps/book-list.jsx'
import { BookDetails } from './book-details.jsx'
import { BookFilter } from '../cmps/book-filter.jsx'

export function BookIndex() {
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    const [books, setBooks] = useState([])
    const [selectedBook, setSelectedBook] = useState(null)
    // const [userMsg, setUserMsg] = useState('')

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy).then((booksToUpdate) => {
            setBooks(booksToUpdate)
        })
    }

    function onSetFilter(filterByFromFilter) {
        setFilterBy(filterByFromFilter)
    }


    function onSelectBook(bookId) {
        bookService.get(bookId).then((book) => {
            setSelectedBook(book)
        })
    }

    return (
        <section className='book-index'>
            <h1>Books</h1>
            {!selectedBook && (
                <div>
                    <BookFilter onSetFilter={onSetFilter}/>
                    <BookList books={books} onSelectBook={onSelectBook} />
                </div>
            )}
            {selectedBook && <BookDetails book={selectedBook} onGoBack={() => setSelectedBook(null)} />}
        </section>
    )
}
