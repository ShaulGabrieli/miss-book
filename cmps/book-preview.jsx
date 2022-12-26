import { utilService } from "../services/util.service.js"


export function BookPreview({book}){
    return <article className="book-preview">
        <h2>{book.title}</h2>
        <p>Description: {book.description}</p>
        <img src={book.thumbnail} />
        <p>price: {utilService.getAmount(book.listPrice.amount, book.listPrice.currencyCode)}</p>
    </article>
}