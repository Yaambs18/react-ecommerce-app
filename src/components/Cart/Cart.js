
import { Button, Modal } from "react-bootstrap";
import CartItem from "./CartItem";

const Cart = (props) => {
    
    const cartElements = [
        {
            title: 'Colors',
            price: 100,
            imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',
            quantity: 2,
        },
        {
            title: 'Black and white Colors',
            price: 50,
            imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',
            quantity: 3,
        },
        {
            title: 'Yellow and Black Colors',
            price: 70,
            imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
            quantity: 1,
        }
    ];

    const cartItems = <ul>
        {cartElements.map((item, index) => {
            return <CartItem key={index} name={item.title} price={item.price} amount={item.quantity}/>;
        })}
    </ul>

    return (
        <Modal show={true} onHide={props.onCartClick} centered backdrop='static'>
            <Modal.Header closeButton>
                <Modal.Title>Cart</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                { cartItems }
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={props.onCartClick}>Close</Button>
                <Button variant="primary">Order</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default Cart;