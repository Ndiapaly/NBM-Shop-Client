import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; // eslint-disable-line no-unused-vars
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from '../utils/axios';
import { toast } from 'react-toastify';

// Configuration Stripe
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

// Fonction utilitaire pour formater les prix
const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(price || 0);
};

const PaymentForm = ({ order, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      // Créer une intention de paiement côté serveur
      const { data } = await axios.post(`/api/orders/${order._id}/create-payment-intent`, {
        amount: Math.round((order.totalPrice + order.shippingPrice) * 100) // Convertir en centimes
      });

      // Confirmer le paiement
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: order.shippingAddress.fullName,
            email: order.user.email
          }
        }
      });

      if (result.error) {
        setError(result.error.message);
        setProcessing(false);
        toast.error('Erreur de paiement');
      } else {
        // Paiement réussi
        await axios.put(`/api/orders/${order._id}/pay`, {
          paymentResult: result.paymentIntent
        });

        toast.success('Paiement effectué avec succès');
        onPaymentSuccess();
      }
    } catch (err) {
      console.error('Erreur de paiement:', err);
      setError(err.response?.data?.message || 'Erreur lors du paiement');
      toast.error('Échec du paiement');
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement 
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      {error && (
        <div className="text-red-500 text-sm mt-2">
          {error}
        </div>
      )}
      <button 
        type="submit" 
        disabled={processing || !stripe}
        className={`w-full py-3 rounded-full text-white font-semibold transition-colors ${
          processing || !stripe 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {processing ? 'Traitement...' : `Payer ${formatPrice(order.totalPrice + order.shippingPrice)}`}
      </button>
    </form>
  );
};

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({
    _id: '',
    orderItems: [],
    shippingAddress: {},
    paymentMethod: '',
    isPaid: false,
    status: '',
    totalPrice: 0,
    shippingPrice: 0,
    paidAt: null,
    user: {}
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/orders/${id}`);
        setOrder(response.data || {
          _id: '',
          orderItems: [],
          shippingAddress: {},
          paymentMethod: '',
          isPaid: false,
          status: '',
          totalPrice: 0,
          shippingPrice: 0,
          paidAt: null,
          user: {}
        });
        setLoading(false);
      } catch (err) {
        console.error('Erreur lors de la récupération des détails de la commande:', err);
        setError(err.response?.data?.message || 'Erreur de chargement de la commande');
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  const calculateTotal = () => {
    const total = (order.totalPrice || 0) + (order.shippingPrice || 0);
    return formatPrice(total);
  };

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
          to="/orders" 
          className="mt-4 inline-block bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors"
        >
          Retour aux commandes
        </Link>
      </div>
    );
  }

  if (!order._id) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-gray-500 mb-4">Commande non trouvée</h2>
        <Link 
          to="/orders" 
          className="mt-4 inline-block bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors"
        >
          Retour aux commandes
        </Link>
      </div>
    );
  }

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false);
    // Mettre à jour l'état de la commande
    setOrder(prevOrder => ({
      ...prevOrder,
      isPaid: true,
      paidAt: new Date().toISOString(),
      status: 'Payée'
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Détails de la Commande #{order._id.slice(-6)}
          </h1>
          <div className={`px-4 py-2 rounded-full text-sm font-medium ${
            order.status === 'Livrée' ? 'bg-green-100 text-green-800' :
            order.status === 'En cours' ? 'bg-yellow-100 text-yellow-800' :
            'bg-blue-100 text-blue-800'
          }`}>
            {order.status || 'En attente'}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Détails de livraison */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Adresse de Livraison</h2>
            <div className="space-y-2 text-gray-600">
              <p>{order.shippingAddress.fullName || 'Non spécifié'}</p>
              <p>{order.shippingAddress.address || 'Non spécifié'}</p>
              <p>
                {order.shippingAddress.postalCode || ''} {order.shippingAddress.city || 'Non spécifié'}
              </p>
              <p>{order.shippingAddress.country || 'Non spécifié'}</p>
            </div>
          </div>

          {/* Méthode de Paiement */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Méthode de Paiement</h2>
            <div className="space-y-2 text-gray-600">
              <p>{order.paymentMethod || 'Non spécifié'}</p>
              <p className={`font-bold ${order.isPaid ? 'text-green-600' : 'text-red-600'}`}>
                {order.isPaid ? 'Payée' : 'Non payée'}
              </p>
              {order.paidAt && (
                <p className="text-sm text-gray-500">
                  Payée le {new Date(order.paidAt).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Liste des Produits */}
        <div className="mt-8 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Produits Commandés</h2>
          <div className="divide-y divide-gray-200">
            {order.orderItems.map((item) => (
              <div key={item._id} className="flex justify-between py-4">
                <div className="flex items-center space-x-4">
                  <img 
                    src={item.product?.images?.[0] || '/placeholder-image.png'} 
                    alt={item.product?.name || 'Produit'} 
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {item.product?.name || 'Produit non disponible'}
                    </h3>
                    <p className="text-gray-600">Taille: {item.size || 'Non spécifié'}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">
                    {item.quantity} x {formatPrice(item.price)}
                  </p>
                  <p className="text-gray-600">
                    Total: {formatPrice(item.quantity * item.price)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Récapitulatif de la Commande */}
        <div className="mt-8 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Récapitulatif</h2>
          <div className="space-y-2 text-gray-600">
            <div className="flex justify-between">
              <span>Total articles</span>
              <span>{formatPrice(order.totalPrice)}</span>
            </div>
            <div className="flex justify-between">
              <span>Livraison</span>
              <span>{formatPrice(order.shippingPrice)}</span>
            </div>
            <div className="flex justify-between font-bold text-gray-800 text-lg border-t pt-2">
              <span>Total TTC</span>
              <span>{calculateTotal()}</span>
            </div>
          </div>
        </div>

        {/* Modal de Paiement */}
        {showPaymentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
              <button 
                onClick={() => setShowPaymentModal(false)}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              >
                ✕
              </button>
              <h2 className="text-2xl font-bold mb-6 text-center">Paiement de la Commande</h2>
              <Elements stripe={stripePromise}>
                <PaymentForm 
                  order={order} 
                  onPaymentSuccess={handlePaymentSuccess} 
                />
              </Elements>
            </div>
          </div>
        )}

        {/* Bouton de paiement */}
        {!order.isPaid && (
          <div className="mt-8 flex justify-between">
            <Link 
              to="/orders" 
              className="bg-gray-500 text-white px-6 py-3 rounded-full hover:bg-gray-600 transition-colors"
            >
              Retour aux commandes
            </Link>
            <button 
              onClick={() => setShowPaymentModal(true)}
              className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-colors"
            >
              Payer maintenant
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
