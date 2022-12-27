const {Link} = ReactRouterDOM

import { BookPreview } from './book-preview.jsx'

export function BookList({ books, onRemoveBook }) {

    return <section className="book-list grid-container">
        {
            books.map(book => <article key={book.id}>
            <BookPreview book={book}/>
                <div>
                <button onClick={() => onRemoveBook(book.id)}>Remove Book</button>
                <Link to={`/book/${book.id}`}>More info</Link>
                </div>
            </article>)
        }
    </section>
}