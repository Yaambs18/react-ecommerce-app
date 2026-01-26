import { useContext, useEffect, useReducer } from "react";
import CartContext from "./cart-context";
import AuthContext from "./auth-context";

const cartReducer = (state, action) => {
    if (action.type === 'REPLACE_CART') {
        return {
            items: action.items,
            totalAmount: action.totalAmount
        };
    }
    else if (action.type === 'ADD') {
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

    const authCtx = useContext(AuthContext);
    const [cartState, dispatchCartAction] = useReducer(cartReducer, initialCartState);

    const cleanEmail = authCtx.userEmail?.replace('@', '').replace('.', '');
    const apiUrl = `https://crudcrud.com/api/5532a05a2f67488fa168287a4682d7c0/cart${cleanEmail}`;

    useEffect(() => {
        if (!cleanEmail) return;

        async function fetchData() {
            try {
                const response = await fetch(apiUrl);
                if (response.ok) {
                    const data = await response.json();
                    const total = data.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                    dispatchCartAction({ type: 'REPLACE_CART', items: data, totalAmount: total });
                }
            } catch (err) { 
                console.error("Initial load failed", err); 
                alert('Failed to load card!!!');
            }
        }
        fetchData();
    }, [cleanEmail, apiUrl]);


    const addItemtoCartHandler = async (item) => {
        const existingItem = cartState.items.find(i => i.id === item.id);
        console.log('aaya', existingItem);
        try {
            if (existingItem) {
                // PUT request for existing item
                const updatedItem = { ...existingItem, quantity: existingItem.quantity + 1 };
                const { _id, ...itemWithoutId } = updatedItem;

                await fetch(`${apiUrl}/${_id}`, {
                    method: 'PUT',
                    body: JSON.stringify(itemWithoutId),
                    headers: { 'Content-Type': 'application/json' }
                });
                dispatchCartAction({ type: 'ADD', item: item });
                return;
            } else {
                // POST request for new item
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    body: JSON.stringify({ ...item, quantity: 1 }),
                    headers: { 'Content-Type': 'application/json' }
                });
                const data = await response.json();
                dispatchCartAction({ type: 'ADD', item: data });
                return;
            }
        } catch (err) { 
            alert("Failed to add item to cart!"); 
        }
    };

    const removeItemFromCartHandler = async (id) => {
        const existingItem = cartState.items.find(i => i.id === id);
        const updatedItem = { ...existingItem, quantity: existingItem.quantity - 1 };
        const { _id, ...itemWithoutId } = updatedItem;
        try {
            if (existingItem.quantity === 1) {
                const response = await fetch(`${apiUrl}/${_id}`, {
                    method: 'DELETE'
                });
                if (!response.ok) {
                    throw new Error("Failed to remove item from cart!!!");
                }
                dispatchCartAction({ type: 'REMOVE', id: id });
            } else {
                const response = await fetch(`${apiUrl}/${_id}`, {
                    method: 'PUT',
                    body: JSON.stringify(itemWithoutId),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error("Failed to remove item from cart!!!");
                }
                dispatchCartAction({ type: 'REMOVE', id: id });
            }
        } catch (error) {
            alert(error.message);
        }
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