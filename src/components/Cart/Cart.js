
import { Button, Modal } from "react-bootstrap";
import CartItem from "./CartItem";
import { useContext } from "react";
import CartContext from "../../store/cart-context";

const Cart = (props) => {

    const cartCtx = useContext(CartContext);

    const cartItems = <ul>
        {cartCtx.items.map((item, index) => {
            return <CartItem key={index} id={item.id} name={item.title} price={item.price} amount={item.quantity}/>;
        })}
    </ul>

    if (cartCtx.items.length === 0) {
        return (
            <Modal show={true} onHide={props.onCartClick} centered backdrop='static'>
                <Modal.Header closeButton>
                    <Modal.Title>Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Your cart is empty.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onCartClick}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }

    return (
        <Modal show={true} onHide={props.onCartClick} centered backdrop='static'>
            <Modal.Header closeButton>
                <Modal.Title>Cart</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                { cartItems }
                <div className="modal-body d-flex justify-content-between">
                    <h4>Total Amount: </h4>
                    <h4>Rs {cartCtx.totalAmount.toFixed(2)}</h4>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={props.onCartClick}>Close</Button>
                <Button variant="primary">Order</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default Cart;