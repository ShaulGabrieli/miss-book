const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {

    return <header className="app-header">
        <div className="header-container">
            <h1>Book App</h1>
            <nav className="app-nav">
                <NavLink to="/">Home</NavLink> |
                <NavLink to="/book">Book</NavLink> |
                <NavLink to="/about">About</NavLink>
            </nav>
        </div>
    </header>
}