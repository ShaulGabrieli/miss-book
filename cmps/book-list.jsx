import { BookPreview } from './book-preview.jsx'

export function BookList({ books, onSelectBook }) {

    return <section className="book-list grid-container">
        {
            books.map(book => <article key={book.id}>
            
            <BookPreview book={book}/>
                <div>
                <button onClick={() => onSelectBook(book.id)}>More info</button>
                </div>
            </article>)
        }
    </section>
}