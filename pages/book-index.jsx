const { useState, useEffect } = React
const { Link } = ReactRouterDOM
import { bookService } from '../services/book.service.js'
import { BookList } from '../cmps/book-list.jsx'
import { BookFilter } from '../cmps/book-filter.jsx'

export function BookIndex() {
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    const [books, setBooks] = useState([])
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

    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                const updatedBooks = books.filter(book => book.id !== bookId)
                setBooks(updatedBooks)
                
            })
    }



    return (
        <section className='book-index'>
            <h1>Books</h1>
                <div>
                    <BookFilter onSetFilter={onSetFilter}/>
                    <Link to="/book/edit">Add Book</Link>
                    <BookList books={books} onRemoveBook={onRemoveBook}  />
                </div>    
        </section>
    )
}
