import { Button } from "react-bootstrap";
import "./Header.css";
import { useContext } from "react";
import CartContext from "../../store/cart-context";

const Header = (props) => {

    const cartCtx = useContext(CartContext);

    const totalAmount = cartCtx.items.reduce((currNumber, item) => {
        return currNumber + item.quantity;
    }, 0);
    
    return (
        <header>
            <ul className="header">
                <li>Home</li>
                <li>Store</li>
                <li>About</li>
                <li className="cart">
                    <Button variant="light" className="cart-button" onClick={props.onCartClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                        </svg> Cart ({totalAmount})
                    </Button>
                </li>
            </ul>
            <h1>Ecommerce App</h1>
        </header>
    )
}

export default Header;