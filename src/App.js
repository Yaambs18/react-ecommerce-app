import './App.css';
import Products from './components/Products/Products';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/Root';
import About from './pages/About';
import Home from './pages/Home';
import ContactUs from './pages/ContactUs';
import ProductDetail from './components/Products/ProductDetail';
import Auth from './pages/Auth';
import AuthProvider from './store/AuthProvider';

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
        path: '/products',
        element: <Products />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/contact-us',
        element: <ContactUs />
      },
      {
        path: '/products/:id',
        element: <ProductDetail />
      },
      {
        path: '/auth',
        element: <Auth />
      }
    ]
  }
])

function App() {

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
