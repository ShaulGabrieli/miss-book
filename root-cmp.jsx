const { useState } = React
const Router = ReactRouterDOM.HashRouter
const { Route, Routes } = ReactRouterDOM

import { HomePage } from './pages/home-page.jsx'
import { AboutUs } from './pages/about-us.jsx'
import { BookIndex } from './pages/book-index.jsx'
import { AppHeader } from './cmps/app-header.jsx'
import { BookDetails } from './pages/book-details.jsx'
import { BookEdit } from './cmps/book-edit.jsx'

export function App() {
    return (
        <Router>
            <section className='app'>
                <AppHeader />
                <main className='main-layout'>
                    <Routes>
                        <Route element={<HomePage />} path='/' />
                        <Route element={<AboutUs />} path='/about' />
                        <Route element={<BookIndex />} path='/book' />
                        <Route element={<BookEdit />} path="/book/edit" />
                        <Route element={<BookDetails />} path='/book/:bookId' />
                    </Routes>
                </main>
            </section>
        </Router>
    )
}
