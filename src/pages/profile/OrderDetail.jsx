import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderById } from '../../features/orders/ordersSlice';

const OrderDetail = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const { currentOrder: order, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    if (orderId) {
      dispatch(fetchOrderById(orderId));
    }
  }, [dispatch, orderId]);

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
        <Link
          to="/profile/orders"
          className="mt-4 inline-block text-blue-600 hover:text-blue-800"
        >
          Retour à mes commandes
        </Link>
      </div>
    );
  }

  if (!order) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          to="/profile/orders"
          className="text-blue-600 hover:text-blue-800"
        >
          ← Retour à mes commandes
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-start border-b pb-6">
          <div>
            <h2 className="text-2xl font-semibold">
              Commande #{order._id.slice(-8)}
            </h2>
            <p className="text-gray-600">
              Passée le {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="text-right">
            <p className="text-lg font-medium">{order.totalPrice.toFixed(2)} cfa</p>
            <p className={`text-sm ${
              order.status === 'completed' ? 'text-green-600' : 
              order.status === 'pending' ? 'text-yellow-600' : 'text-gray-600'
            }`}>
              {order.status === 'completed' ? 'Livré' : 
               order.status === 'pending' ? 'En cours' : 'En attente'}
            </p>
          </div>
        </div>

        <div className="py-6 border-b">
          <h3 className="text-lg font-medium mb-4">Adresse de livraison</h3>
          <div className="text-gray-600">
            <p>{order.shippingAddress.fullName}</p>
            <p>{order.shippingAddress.address}</p>
            <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
            <p>{order.shippingAddress.country}</p>
          </div>
        </div>

        <div className="py-6">
          <h3 className="text-lg font-medium mb-4">Articles commandés</h3>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item._id} className="flex items-start">
                <div className="w-20 h-20 flex-shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
                <div className="ml-4 flex-grow">
                  <h4 className="font-medium">{item.product.name}</h4>
                  <p className="text-gray-600">
                    Taille: {item.size}
                  </p>
                  <p className="text-gray-600">
                    Quantité: {item.quantity}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    {(item.product.price * item.quantity).toFixed(2)} cfa
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t">
          <div className="flex justify-between text-lg font-medium">
            <span>Total</span>
            <span>{order.totalPrice.toFixed(2)} cfa</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
