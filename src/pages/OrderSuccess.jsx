import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <i className="fas fa-check-circle text-6xl text-green-500"></i>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Commande confirmée !
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Merci pour votre commande. Vous recevrez bientôt un email de confirmation.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            to="/profile/orders"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Voir mes commandes
          </Link>
          
          <Link
            to="/"
            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
