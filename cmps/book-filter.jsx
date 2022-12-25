const { useState, useEffect } = React

import { bookService } from '../services/book.service.js'



    export function BookFilter({ onSetFilter }) {

        const [filterByToEdit, setFilterByToEdit] = useState(bookService.getDefaultFilter())
    
        useEffect(() => {
            onSetFilter(filterByToEdit)
        }, [filterByToEdit])
    
        function handleChange({ target }) {
            let { value, name: field, type } = target
            value = (type === 'number') ? +value : value
            setFilterByToEdit((prevFilter) => {
                return { ...prevFilter, [field]: value }
            })
        }
    
        function onSubmitFilter(ev) {
            ev.preventDefault()
            onSetFilter(filterByToEdit)
        }

    return <section className="book-filter">
    <h2>Books filter:</h2>
    <form onSubmit={onSubmitFilter}>
        <label htmlFor="bookTitle">Book Title:</label>
        <input type="text"
            id="bookTitle"
            name="txt"
            placeholder="By title"
            value={filterByToEdit.txt}
            onChange={handleChange}
        />

        <label htmlFor="price">Min speed:</label>
        <input type="number"
            id="price"
            name="price"
            placeholder="By price"
            value={filterByToEdit.price}
            onChange={handleChange}
        />

        <button>Filter</button>
    </form>

</section>
}