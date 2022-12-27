const { useEffect, useState } = React
const { useParams, useNavigate, Link } = ReactRouterDOM
import { bookService } from '../services/book.service.js'
import { LongTxt } from '../cmps/long-txt.jsx'
import { ReviewList } from '../cmps/review-list.jsx'
import { AddReview } from '../cmps/add-review.jsx'
export function BookDetails() {
    const [book, setBook] = useState(null)
    const [date, setDate] = useState(null)
    const [bookPageCount, setBookPageCount] = useState(null)
    const [bookPublishedAt, setBookPublishedAt] = useState(null)
    const [bookDynClass, setBookDynClass] = useState(null)
    const [nextBookId, setNextBookId] = useState(null)
    const { bookId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadBook()
    }, [bookId])

    function loadBook() {
        bookService
            .get(bookId)
            .then((book) => {
                setBook(book)
                setDate(new Date().getFullYear(book))
                setBookPageCount(checkBookReading(book))
                setBookPublishedAt(checkBookPublishYear(book))
                setBookDynClass(checkBookPrice(book))
            })

            .catch((err) => {
                console.log('Had issues in book details', err)
                navigate('/book')
            })
        bookService.getNextBookId(bookId).then(setNextBookId)
    }

    function checkBookReading(book) {
        let strPagesCount = ''
        if (book.pageCount > 500) strPagesCount = book.pageCount + ' Serious Reading'
        else if (book.pageCount <= 500 && book.pageCount > 200) strPagesCount = book.pageCount + ' Descent Reading'
        else if (book.pageCount < 100) strPagesCount = book.pageCount + ' Light Reading'
        else strPagesCount = book.pageCount

        return strPagesCount
    }

    function checkBookPublishYear(book) {
        let strPublishedAt = ''
        if (date - book.publishedDate > 10) strPublishedAt = book.publishedDate + ' Vintage'
        else if (date - book.publishedDate <= 1) strPublishedAt = book.publishedDate + ' New'
        else strPublishedAt = book.publishedDate
        return strPublishedAt
    }

    function checkBookPrice(book) {
        let dynClass = ''
        if (book.listPrice.amount > 150) dynClass = 'red'
        else if (book.listPrice.amount < 20) dynClass = 'green'
        return dynClass
    }

    function onGoBack() {
        navigate('/book')
    }
    function onRemoveReview(reviewId) {
        bookService.removeReview(book.id, reviewId).then(() => {
            const filteredReviews = book.reviews.filter((review) => review.id !== reviewId)
            setBook({ ...book, reviews: filteredReviews })
        })
    }

    function onSaveReview(reviewToAdd) {
        bookService
            .saveReview(book.id, reviewToAdd)
            .then((review) => {
                const reviews = [review, ...book.reviews]
                setBook({ ...book, reviews })
            })
            .catch((err) => {
                console.log('err:', err)
            })
    }

    if (!book) return <div> Loading...</div>
    return (
        <section className='book-details'>
            <h1>Title: {book.title}</h1>
            <h3>Subtitle : {book.subtitle}</h3>
            <h3>
                Price:{' '}
                <span className={bookDynClass}>
                    {book.listPrice.amount} {book.listPrice.currencyCode}
                </span>
            </h3>
            <h4>Published At: {bookPublishedAt}</h4>
            <h4>Pages Count: {bookPageCount}</h4>
            {book.listPrice.isOnSale && <h2 className='green'>On Sale Right Now ! </h2>}
            <img src={book.thumbnail} />
            <LongTxt txt={book.description} length={100} />
            <AddReview onSaveReview={onSaveReview} />

            {!book.reviews.length && <span className='title'>No reviews yet</span>}

            <ReviewList book={book} onRemoveReview={onRemoveReview} />
            <Link to={`/book/${nextBookId}`}>Next book</Link>
            <button onClick={onGoBack}>Go Back</button>
        </section>
    )
}
