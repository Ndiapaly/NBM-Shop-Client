import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const UserDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('profile');

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const response = await axios.get('/api/orders/user', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        toast.error('Impossible de charger vos commandes');
        setLoading(false);
      }
    };

    if (user) {
      fetchUserOrders();
    }
  }, [user]);

  const renderProfileSection = () => (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Informations Personnelles</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="font-semibold">Nom</p>
          <p>{user.name}</p>
        </div>
        <div>
          <p className="font-semibold">Email</p>
          <p>{user.email}</p>
        </div>
        <div>
          <p className="font-semibold">Date d'inscription</p>
          <p>{new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="mt-4">
        <Link 
          to="/edit-profile" 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Modifier le profil
        </Link>
      </div>
    </div>
  );

  const renderOrdersSection = () => (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Historique des Commandes</h2>
      {loading ? (
        <p>Chargement des commandes...</p>
      ) : orders.length === 0 ? (
        <p>Vous n'avez pas encore passé de commande.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">N° Commande</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Montant</th>
                <th className="p-3 text-left">Statut</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b">
                  <td className="p-3">{order._id.slice(-8)}</td>
                  <td className="p-3">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="p-3">{order.totalPrice.toFixed(2)} €</td>
                  <td className="p-3">
                    <span 
                      className={`px-2 py-1 rounded text-white ${
                        order.status === 'Livré' ? 'bg-green-500' : 
                        order.status === 'En cours' ? 'bg-yellow-500' : 
                        'bg-red-500'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <Link 
                      to={`/order/${order._id}`} 
                      className="text-blue-500 hover:underline"
                    >
                      Détails
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  const renderWishlistSection = () => (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Liste de Souhaits</h2>
      {/* Implémentation future de la liste de souhaits */}
      <p>Fonctionnalité à venir prochainement.</p>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Mon Tableau de Bord</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Menu latéral */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <nav>
            <ul>
              <li 
                className={`dashboard-menu-item ${
                  activeSection === 'profile' ? 'dashboard-menu-item-active' : ''
                }`}
                onClick={() => setActiveSection('profile')}
              >
                Profil
              </li>
              <li 
                className={`dashboard-menu-item ${
                  activeSection === 'orders' ? 'dashboard-menu-item-active' : ''
                }`}
                onClick={() => setActiveSection('orders')}
              >
                Mes Commandes
              </li>
              <li 
                className={`dashboard-menu-item ${
                  activeSection === 'wishlist' ? 'dashboard-menu-item-active' : ''
                }`}
                onClick={() => setActiveSection('wishlist')}
              >
                Liste de Souhaits
              </li>
            </ul>
          </nav>
        </div>

        {/* Contenu principal */}
        <div className="md:col-span-3">
          {activeSection === 'profile' && renderProfileSection()}
          {activeSection === 'orders' && renderOrdersSection()}
          {activeSection === 'wishlist' && renderWishlistSection()}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
