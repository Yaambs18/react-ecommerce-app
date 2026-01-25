import { Button } from "react-bootstrap";
import "./Header.css";
import { useContext } from "react";
import CartContext from "../../store/cart-context";
import { Link, replace, useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";

const Header = (props) => {

    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();

    const cartCtx = useContext(CartContext);

    const totalAmount = cartCtx.items.reduce((currNumber, item) => {
        return currNumber + item.quantity;
    }, 0);

    const logoutHandler = () => {
        authCtx.clearToken();
        navigate('/auth', { replace: true });
    }
    
    return (
        <header>
            <nav className="navbar navbar-expand-md navbar-light bg-light">
                <ul className="navbar-nav">
                    <li className="nav-item"><Link to="/">Home</Link></li>                
                    <li className="nav-item"><Link to="/products">Store</Link></li>                
                    <li className="nav-item"><Link to="/about">About</Link></li>
                    <li className="nav-item"><Link to="/contact-us">Contact Us</Link></li>

                    <li className="nav-item cart">
                        <Button variant="light" className="cart-button" onClick={props.onCartClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                            </svg> Cart ({totalAmount})
                        </Button>
                            
                    </li>
                    { !authCtx.isLoggedIn && <li className="nav-item">
                        <Link to="/auth">Login</Link>
                    </li> }
                    { 
                        authCtx.isLoggedIn && 
                        <Button variant="link" onClick={logoutHandler}>Logout</Button>
                    }
                </ul>
            </nav>
            <h1 className="text-center">Ecommerce App</h1>
        </header>
    )
}

export default Header;