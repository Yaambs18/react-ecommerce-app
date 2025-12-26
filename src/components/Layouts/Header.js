import "./Header.css";

const Header = (props) => {
    return (
        <header>
            <ul className="header">
                <li>Home</li>
                <li>Store</li>
                <li>About</li>
            </ul>
            <h1>Ecommerce App</h1>
        </header>
    )
}

export default Header;