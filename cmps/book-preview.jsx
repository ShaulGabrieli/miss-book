

export function BookPreview({book}){
    return <article className="book-preview">
        <h2>{book.title}</h2>
        <p>Description: {book.description}</p>
        <img src={book.thumbnail} />
    </article>
}