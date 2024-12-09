import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { updateCartItemQuantity, removeFromCart } from '../features/cart/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleQuantityChange = (productId, size, newQuantity) => {
    if (newQuantity < 1) {
      dispatch(removeFromCart({ productId, size }));
    } else {
      dispatch(updateCartItemQuantity({ productId, size, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (productId, size) => {
    dispatch(removeFromCart({ productId, size }));
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate('/checkout');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Votre panier est vide</h2>
        <p className="text-gray-600 mb-8">Découvrez nos produits et commencez vos achats !</p>
        <Link
          to="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
        >
          Retour à la boutique
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Votre Panier</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Liste des produits */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={`${item.productId}-${item.size}`}
              className="bg-white rounded-lg shadow p-6 flex items-center space-x-4"
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />
              
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                <p className="text-gray-600">Taille: {item.size}</p>
                <p className="text-gray-600">{item.price}€</p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleQuantityChange(item.productId, item.size, item.quantity - 1)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <i className="fas fa-minus"></i>
                </button>
                <span className="px-4 py-2 bg-gray-100 rounded">{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.productId, item.size, item.quantity + 1)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <i className="fas fa-plus"></i>
                </button>
              </div>

              <button
                onClick={() => handleRemoveItem(item.productId, item.size)}
                className="text-red-500 hover:text-red-700"
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          ))}
        </div>

        {/* Résumé de la commande */}
        <div className="bg-white rounded-lg shadow p-6 h-fit space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Résumé de la commande</h2>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Sous-total</span>
              <span className="font-semibold">{calculateTotal().toFixed(2)}€</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Livraison</span>
              <span className="font-semibold">Gratuite</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-lg font-bold text-blue-600">
                  {calculateTotal().toFixed(2)}€
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            {isAuthenticated ? 'Passer la commande' : 'Se connecter pour commander'}
          </button>

          <Link
            to="/"
            className="block text-center text-blue-600 hover:text-blue-700 mt-4"
          >
            Continuer mes achats
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
