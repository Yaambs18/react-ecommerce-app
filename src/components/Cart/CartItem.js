import { Button } from "react-bootstrap";

import "./CartItem.css";

const CartItem = (props) => {
    return (
        <li className="cart-item">
            <div>
                <h2>{props.name}</h2>
                <div className="summary">
                    <span className="price">Rs {props.price}</span>
                    <span className="amount">X{props.amount}</span>
                </div>
            </div>
            <div className="actions">
                <Button>-</Button>
                <Button>+</Button>
            </div>
        </li>
    )
}

export default CartItem;