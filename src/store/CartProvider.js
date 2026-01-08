import { useReducer } from "react";
import CartContext from "./cart-context";

const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.quantity;
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
        );
        const existingCartItem = state.items[existingCartItemIndex];

        let updatedItems;
        if (existingCartItem) {
            const updatedItems = [...state.items];
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity + action.item.quantity
            };
            updatedItems[existingCartItemIndex] = updatedItem;
            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount
            };
        } else {
            updatedItems = state.items.concat(action.item);
            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount
            };
        }
    } else if (action.type === 'REMOVE') {
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );
        if (existingCartItemIndex === -1) {
            return state;
        }
        const existingCartItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingCartItem.price;

        let updatedItems;
        if (existingCartItem.quantity === 1) {
            updatedItems = state.items.filter(item => item.id !== action.id);
            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount
            };
        } else {
            updatedItems = [...state.items];
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity - 1
            };
            updatedItems[existingCartItemIndex] = updatedItem;
            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount
            };
        }
    } else if (action.type === 'CLEAR') {
        return {
            items: [],
            totalAmount: 0
        };
    } else {
        return state;
    }
}

const initialCartState = {
    items: [],
    totalAmount: 0
}

const CartProvider = (props) => {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, initialCartState);

    const addItemtoCartHandler = (item) => {
        dispatchCartAction({ type: 'ADD', item: item });
    }

    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({ type: 'REMOVE', id: id });
    }

    const clearCartHandler = () => {
        dispatchCartAction({ type: 'CLEAR' });
    }

    return (
        <CartContext.Provider value={{
            items: cartState.items,
            totalAmount: cartState.totalAmount,
            addItem: addItemtoCartHandler,
            removeItem: removeItemFromCartHandler,
            clearCart: clearCartHandler
        }}> { props.children } </CartContext.Provider>
    )
}

export default CartProvider;