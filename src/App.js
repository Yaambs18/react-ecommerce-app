import { useState } from 'react';
import './App.css';
import Cart from './components/Cart/Cart';
import Header from './components/Layouts/Header';
import Products from './components/Products/Products';

function App() {
  const [showCart, setShowCart] = useState(false);

  const cartClickHandler = () => {
    setShowCart(prevState => !prevState);
  }

  return (
    <div className="App">
      <Header onCartClick={cartClickHandler}/>
      <main>
        { showCart && <Cart onCartClick={cartClickHandler}/> }
        <Products />
      </main>
    </div>
  );
}

export default App;
