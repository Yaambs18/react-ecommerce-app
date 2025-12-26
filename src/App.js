import './App.css';
import Header from './components/Layouts/Header';
import Products from './components/Products/Products';

function App() {
  return (
    <div className="App">
      <Header/>
      <main>
        <Products />
      </main>
    </div>
  );
}

export default App;
