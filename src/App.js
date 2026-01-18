import './App.css';
import Products from './components/Products/Products';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/Root';
import About from './pages/About';
import Home from './pages/Home';
import ContactUs from './pages/ContactUs';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/store',
        element: <Products />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/contact-us',
        element: <ContactUs />
      }
    ]
  }
])

function App() {

  return (
    <RouterProvider router={router} />
  );
}

export default App;
