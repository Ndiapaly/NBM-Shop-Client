import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { Toaster } from 'react-hot-toast';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import PrivateRoute from './components/routing/PrivateRoute';
import ProductDetail from './pages/ProductDetail';
import OrderSuccess from './pages/OrderSuccess';
import About from './pages/About';
import Contact from './pages/Contact';
import ProductList from './pages/ProductList';
import Categorie from './pages/Categorie';
import Nouveaute from './pages/Nouveaute';
import Promotion from './pages/Promotion';
import FAQ from './pages/FAQ';
import PolitiqueRetour from './pages/PolitiqueRetour';
import Orders from './pages/Orders';
import OrderDetails from './pages/OrderDetails';
import AddProduct from './pages/AddProduct';
import PolitiqueConfidentialite from './pages/PolitiqueConfidentialite';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Toaster />
        <ToastContainer />
        <Router>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/produits" element={<ProductList />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-success" element={<OrderSuccess />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path='/profile' element={<Profile />} />
                <Route path="/categories" element={<Categorie />} />
                <Route path="/nouveautes" element={<Nouveaute />} />
                <Route path="/promotions" element={<Promotion />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/politique-retour" element={<PolitiqueRetour />} />
                <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/order/:id" element={<OrderDetails />} />
                <Route 
                  path="/dashboard" 
                  element={
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  } 
                />
                <Route path="/ajouter-produit" element={<AddProduct />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
