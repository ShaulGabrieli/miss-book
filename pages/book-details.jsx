


export function BookDetails({book, onGoBack}){
    return <section className="book-details">
        <h1>Book title: {book.title}</h1>
        <h5> {book.description}</h5>
        <img src={book.thumbnail}/>
        <p>Description: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas cumque tempore, aperiam sed dolorum rem! Nemo quidem, placeat perferendis tempora aspernatur sit, explicabo veritatis corrupti perspiciatis repellat, enim quibusdam!</p>
        <button onClick={onGoBack}>Go Back</button>
    </section>
}