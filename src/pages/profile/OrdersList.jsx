import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUserOrders } from '../../features/orders/ordersSlice';

const OrdersList = () => {
  const dispatch = useDispatch();
  const { orders = [], loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-semibold mb-4">Mes commandes</h2>
        <p className="text-gray-600">Vous n'avez pas encore passé de commande.</p>
        <Link
          to="/"
          className="mt-4 inline-block px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Commencer vos achats
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">Mes commandes</h2>
      <div className="space-y-4">
        {orders.map((order) => {
          // Vérifications de sécurité
          if (!order || !order._id || !order.items || !order.totalPrice) {
            return null; // Ne pas afficher les commandes invalides
          }

          return (
            <div
              key={order._id}
              className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">Commande #{order._id.slice(-8)}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(order.createdAt || Date.now()).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{(order.totalPrice || 0).toFixed(2)} cfa</p>
                  <p className={`text-sm ${
                    order.status === 'completed' ? 'text-green-600' : 
                    order.status === 'pending' ? 'text-yellow-600' : 'text-gray-600'
                  }`}>
                    {order.status === 'completed' ? 'Livré' : 
                     order.status === 'pending' ? 'En cours' : 'En attente'}
                  </p>
                </div>
              </div>
              
              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  {order.items?.length || 0} article{(order.items?.length || 0) > 1 ? 's' : ''}
                </p>
                <div className="mt-2 flex gap-2">
                  {(order.items || []).slice(0, 3).map((item) => {
                    // Vérification supplémentaire pour chaque article
                    if (!item || !item.product) return null;
                    
                    return (
                      <div key={item._id} className="w-16 h-16">
                        <img
                          src={item.product.image || '/placeholder-image.png'}
                          alt={item.product.name || 'Article'}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <Link
                  to={`/profile/orders/${order._id}`}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Voir les détails
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrdersList;