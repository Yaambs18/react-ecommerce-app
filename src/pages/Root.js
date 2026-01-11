import { Outlet } from "react-router-dom"
import Header from "../components/Layouts/Header";
import CartProvider from "../store/CartProvider";
import Cart from "../components/Cart/Cart";
import { useState } from "react";

const Root = () => {
    const [showCart, setShowCart] = useState(false);

    const cartClickHandler = () => {
        setShowCart(prevState => !prevState);
    }
    return (
        <CartProvider>
            <Header onCartClick={cartClickHandler} />
            <main>
                { showCart && <Cart onCartClick={cartClickHandler}/> }
                <Outlet />
            </main>
        </CartProvider>
    )
}

export default Root;