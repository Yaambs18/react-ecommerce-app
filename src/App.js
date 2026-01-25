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
import ProtectedRoute from './pages/ProtectedRoute';
import PublicRoute from './pages/PublicRoute';

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
        path: '/about',
        element: <About />
      },
      {
        path: '/contact-us',
        element: <ContactUs />
      },

      //public routes
      {
        element: <PublicRoute />,
        children: [
          {
            path: '/auth',
            element: <Auth />
          }
        ]
      },

      //protected routes
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: '/products',
            element: <Products />
          },
          {
            path: '/products/:id',
            element: <ProductDetail />
          },
        ]
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
