import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserOrders } from '../features/orders/ordersSlice';
import { Link } from 'react-router-dom';

const Orders = () => {
  const dispatch = useDispatch();
  const [localOrders, setLocalOrders] = useState([]);
  const { orders, loading, error } = useSelector((state) => {
    console.log('Redux State:', state);
    return state.orders || { orders: [], loading: false, error: null };
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const result = await dispatch(fetchUserOrders()).unwrap();
        console.log('Fetched Orders:', result);
        setLocalOrders(result || []);
      } catch (err) {
        console.error('Erreur lors de la récupération des commandes', err);
        setLocalOrders([]);
      }
    };

    fetchOrders();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Erreur de chargement</h2>
        <p className="text-gray-600">{error}</p>
        <Link 
          to="/" 
          className="mt-4 inline-block bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors"
        >
          Retour à l'accueil
        </Link>
      </div>
    );
  }

  const displayOrders = localOrders.length > 0 ? localOrders : orders;

  if (!displayOrders || displayOrders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-3xl font-bold mb-6">Mes Commandes</h2>
        <p className="text-gray-600 mb-4">Vous n'avez pas encore passé de commande.</p>
        <Link 
          to="/catalogue" 
          className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-colors"
        >
          Découvrir nos produits
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center">Mes Commandes</h2>
      
      <div className="grid gap-6">
        {displayOrders.map((order) => (
          <div 
            key={order._id} 
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Commande #{order._id.slice(-6)}
                </h3>
                <p className="text-gray-500 text-sm">
                  Passée le {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                order.status === 'Livrée' ? 'bg-green-100 text-green-800' :
                order.status === 'En cours' ? 'bg-yellow-100 text-yellow-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {order.status}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Détails de la commande</h4>
                <ul className="space-y-1 text-gray-600">
                  {order.items && order.items.map((item) => (
                    <li key={item._id} className="flex justify-between">
                      <span>{item.name}</span>
                      <span>
                        {item.quantity} x {item.price.toFixed(2)} €
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Récapitulatif</h4>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between">
                    <span>Total articles</span>
                    <span>{order.totalPrice ? order.totalPrice.toFixed(2) : '0.00'} €</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Livraison</span>
                    <span>{order.shippingPrice ? order.shippingPrice.toFixed(2) : '0.00'} €</span>
                  </div>
                  <div className="flex justify-between font-bold text-gray-800">
                    <span>Total TTC</span>
                    <span>
                      {order.totalPrice && order.shippingPrice 
                        ? (order.totalPrice + order.shippingPrice).toFixed(2) 
                        : '0.00'} €
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <Link
                to={`/order/${order._id}`}
                className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors"
              >
                Détails
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
