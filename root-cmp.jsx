const { useState } = React

import { HomePage } from './pages/home-page.jsx'
import { AboutUs } from './pages/about-us.jsx'
import { BookIndex } from './pages/book-index.jsx'

export function App() {
    const [page, setPage] = useState('home')
    return (
        <section className='app'>
            <header className='app-header'>
                <h1>Miss book</h1>
                <nav className='app-nav'>
                    <a href='#' onClick={() => setPage('home')}>
                        Home
                    </a>{' '}
                    |
                    <a href='#' onClick={() => setPage('about')}>
                        About
                    </a>{' '}
                    |
                    <a href='#' onClick={() => setPage('book')}>
                        Books
                    </a>
                </nav>
            </header>
            <main>
                {page === 'home' && <HomePage />}
                {page === 'about' && <AboutUs />}
                {page === 'book' && <BookIndex />}
            </main>
        </section>
    )
}
