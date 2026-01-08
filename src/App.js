import { useState } from 'react';
import './App.css';
import Cart from './components/Cart/Cart';
import Header from './components/Layouts/Header';
import Products from './components/Products/Products';
import CartProvider from './store/CartProvider';

function App() {
  const [showCart, setShowCart] = useState(false);

  const cartClickHandler = () => {
    setShowCart(prevState => !prevState);
  }

  return (
    <CartProvider>
      <Header onCartClick={cartClickHandler}/>
      <main>
        { showCart && <Cart onCartClick={cartClickHandler}/> }
        <Products />
      </main>
    </CartProvider>
  );
}

export default App;
