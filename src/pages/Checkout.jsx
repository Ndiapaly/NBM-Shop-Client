import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../features/orders/ordersSlice';
import { clearCart } from '../features/cart/cartSlice';
import toast from 'react-hot-toast'; // Import toast

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const [error, setError] = useState(null);

  // Liste des pays avec leurs indicatifs téléphoniques
  const countriesData = [
    { name: 'France', code: '+33', phoneRegex: /^(\+33|0)[1-9]([-. ]?[0-9]{2}){4}$/ },
    { name: 'Sénégal', code: '+221', phoneRegex: /^(\+221)?\s*[7-8][0-9]{8}$/ },
    { name: 'Belgique', code: '+32', phoneRegex: /^(\+32|0)[4-9][0-9](\s?[0-9]{2}){3}$/ },
    { name: 'Suisse', code: '+41', phoneRegex: /^(\+41|0)[7-9][0-9](\s?[0-9]{3}){2}$/ },
    { name: 'Canada', code: '+1', phoneRegex: /^(\+1|1)?[2-9]\d{2}[2-9]\d{2}\d{4}$/ },
    { name: 'États-Unis', code: '+1', phoneRegex: /^(\+1|1)?[2-9]\d{2}[2-9]\d{2}\d{4}$/ },
    { name: 'Maroc', code: '+212', phoneRegex: /^(\+212|0)[6-7][0-9](\s?[0-9]{2}){3}$/ },
    { name: 'Côte d\'Ivoire', code: '+225', phoneRegex: /^(\+225)?[0-9](\s?[0-9]{2}){4}$/ },
    { name: 'Guinée', code: '+224', phoneRegex: /^(\+224)?[0-9](\s?[0-9]{2}){3}$/ },
    { name: 'Mali', code: '+223', phoneRegex: /^(\+223)?[0-9](\s?[0-9]{2}){3}$/ },
    { name: 'Burkina Faso', code: '+226', phoneRegex: /^(\+226)?[0-9](\s?[0-9]{2}){3}$/ },
    { name: 'Togo', code: '+228', phoneRegex: /^(\+228)?[0-9](\s?[0-9]{2}){3}$/ },
    { name: 'Bénin', code: '+229', phoneRegex: /^(\+229)?[0-9](\s?[0-9]{2}){3}$/ },
    { name: 'Cameroun', code: '+237', phoneRegex: /^(\+237)?[0-9](\s?[0-9]{2}){3}$/ },
    { name: 'Gabon', code: '+241', phoneRegex: /^(\+241)?[0-9](\s?[0-9]{2}){3}$/ },
    { name: 'Congo', code: '+242', phoneRegex: /^(\+242)?[0-9](\s?[0-9]{2}){3}$/ },
    { name: 'Allemagne', code: '+49', phoneRegex: /^(\+49|0)[1-9][0-9](\s?[0-9]{3}){2}$/ },
    { name: 'Royaume-Uni', code: '+44', phoneRegex: /^(\+44|0)[7-9][0-9](\s?[0-9]{3}){2}$/ },
    { name: 'Espagne', code: '+34', phoneRegex: /^(\+34)[6-7][0-9](\s?[0-9]{2}){3}$/ },
    { name: 'Italie', code: '+39', phoneRegex: /^(\+39)[0-9](\s?[0-9]{3}){2}$/ },
    { name: 'Pays-Bas', code: '+31', phoneRegex: /^(\+31|0)[6][0-9](\s?[0-9]{3}){2}$/ }
  ];

  const [formData, setFormData] = useState({
    shippingAddress: {
      fullName: user?.name || '',
      address: '',
      city: '',
      postalCode: '',
      country: 'France',
      email: user?.email || '',
      phoneNumber: '',
      phoneCode: '+33'
    },
    paymentMethod: 'a la livraison'
  });

  const [loading, setLoading] = useState(false);

  // Liste des pays
  const countries = countriesData.map(country => country.name).sort();

  // Utiliser useEffect pour gérer la navigation
  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items, navigate]);

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Gestion spéciale pour le pays
    if (name === 'country') {
      // Trouver le code de pays correspondant
      const selectedCountry = countriesData.find(country => country.name === value);
      
      setFormData(prevState => ({
        ...prevState,
        shippingAddress: {
          ...prevState.shippingAddress,
          country: value,
          phoneCode: selectedCountry ? selectedCountry.code : '+33'
        }
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        shippingAddress: {
          ...prevState.shippingAddress,
          [name]: value
        }
      }));
    }
  };

  // Méthodes de paiement disponibles
  const paymentMethods = [
    { id: 'tigocash', label: 'Tigocash' }, 
    { id: 'wave', label: 'Wave' }, 
    { id: 'orange-money', label: 'Orange Money' }, 
    { id: 'payment-at-delivery', label: 'À la livraison' }
  ];

  const handlePaymentMethodChange = (method) => {
    setFormData(prevState => ({
      ...prevState,
      paymentMethod: method
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validate required fields
      const requiredFields = ['fullName', 'address', 'city', 'postalCode', 'email', 'phoneNumber'];
      const missingFields = requiredFields.filter(
        field => !formData.shippingAddress[field]
      );

      if (missingFields.length > 0) {
        throw new Error('Veuillez remplir tous les champs obligatoires');
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.shippingAddress.email)) {
        throw new Error('Veuillez entrer une adresse email valide');
      }

      // Trouver le pays sélectionné
      const selectedCountry = countriesData.find(
        country => country.name === formData.shippingAddress.country
      );

      if (!selectedCountry) {
        throw new Error(`Pays non reconnu: ${formData.shippingAddress.country}`);
      }

      // Formater le numéro de téléphone
      let formattedPhoneNumber = formData.shippingAddress.phoneNumber;

      // Ajouter le code du pays si pas déjà présent
      if (!formattedPhoneNumber.startsWith('+')) {
        // Supprimer le premier '0' si présent
        formattedPhoneNumber = formattedPhoneNumber.replace(/^0/, '');
        
        // Ajouter le code du pays
        formattedPhoneNumber = `${selectedCountry.code}${formattedPhoneNumber}`;
      }

      // Validation du numéro de téléphone
      if (!selectedCountry.phoneRegex.test(formattedPhoneNumber)) {
        throw new Error(`Numéro de téléphone invalide pour ${formData.shippingAddress.country}`);
      }

      const orderItems = items.map(item => ({
        product: item.productId,
        size: parseFloat(item.size),
        quantity: parseInt(item.quantity),
        price: parseFloat(item.price)
      }));

      const orderData = {
        orderItems,
        shippingAddress: {
          ...formData.shippingAddress,
          phoneNumber: formattedPhoneNumber,
          phoneCode: selectedCountry.code
        },
        paymentMethod: formData.paymentMethod,
        totalPrice: calculateTotal()
      };

      const resultAction = await dispatch(createOrder(orderData));
      
      if (createOrder.fulfilled.match(resultAction)) {
        dispatch(clearCart());
        toast.success('Votre commande a été passée avec succès !', {
          duration: 4000,
          position: 'top-center',
          style: {
            background: '#4CAF50',
            color: 'white',
            fontWeight: 'bold',
            padding: '16px',
            borderRadius: '10px'
          },
          icon: '✅'
        });
        navigate('/order-success');
      } else {
        // More detailed error handling
        const errorPayload = resultAction.payload;
        const errorMessage = 
          errorPayload?.message || 
          'Une erreur est survenue lors de la création de la commande';
        
        // Log detailed error information
        console.error('Order Creation Error:', errorPayload);
        
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error('Erreur lors de la création de la commande:', error);
      toast.error(error.message || 'Une erreur est survenue lors de la création de la commande', {
        duration: 4000,
        position: 'top-center',
        style: {
          background: '#F44336',
          color: 'white',
          fontWeight: 'bold',
          padding: '16px',
          borderRadius: '10px'
        }
      });
    } finally {
      setLoading(false);
    }
  };

  // Retourner null si le panier est vide (géré par useEffect)
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Paiement</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Formulaire de paiement */}
        <div className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Adresse de livraison */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Adresse de livraison
              </h2>

              <div className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                    Nom complet*
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.shippingAddress.fullName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Adresse*
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.shippingAddress.address}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    Ville*
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.shippingAddress.city}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                    Code postal*
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.shippingAddress.postalCode}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Adresse email*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.shippingAddress.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                    Numéro de téléphone*
                  </label>
                  <div className="flex">
                    <select
                      name="phoneCode"
                      value={formData.shippingAddress.phoneCode}
                      onChange={handleInputChange}
                      className="mr-2 block w-1/3 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                      {countriesData.map(country => (
                        <option key={country.code} value={country.code}>
                          {country.code}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.shippingAddress.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="Numéro de téléphone"
                      className="block w-2/3 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Format pour {formData.shippingAddress.country}: {
                      countriesData.find(c => c.name === formData.shippingAddress.country)?.phoneRegex.toString()
                    }
                  </p>
                </div>

                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                    Pays
                  </label>
                  <select 
                    id="country"
                    name="country"
                    value={formData.shippingAddress.country}
                    onChange={handleInputChange}
                  >
                    {countries.map(country => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Méthode de paiement */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Méthode de paiement
              </h2>

              <div className="space-y-4">
                {paymentMethods.map((method, index) => (
                  <div 
                    key={index} 
                    onClick={() => handlePaymentMethodChange(method.id)}
                    className={`
                      cursor-pointer p-4 rounded-lg border-2 transition-all duration-300
                      ${formData.paymentMethod === method.id 
                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                        : 'border-gray-200 hover:border-blue-300'}
                    `}
                  >
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        id={`payment-${method.id}`} 
                        name="paymentMethod" 
                        value={method.id}
                        checked={formData.paymentMethod === method.id}
                        onChange={() => handlePaymentMethodChange(method.id)}
                        className="mr-3"
                      />
                      <label htmlFor={`payment-${method.id}`} className="cursor-pointer">
                        {method.label}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Résumé de la commande */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Résumé de la commande
              </h2>

              <div className="space-y-4">
                {items.map((item) => (
                  <div key={`${item.productId}-${item.size}`} className="flex justify-between">
                    <span className="text-gray-600">
                      {item.name} (Taille: {item.size.size || item.size}) x {item.quantity}
                    </span>
                    <span className="font-semibold">{(item.price * item.quantity).toFixed(2)}cfa</span>
                  </div>
                ))}

                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sous-total</span>
                    <span className="font-semibold">{calculateTotal().toFixed(2)}cfa</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-gray-600">Livraison</span>
                    <span className="font-semibold">Gratuite</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-lg font-bold text-blue-600">
                      {calculateTotal().toFixed(2)}cfa
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Traitement en cours...' : 'Confirmer la commande'}
            </button>
          </form>
        </div>

        {/* Résumé du panier */}
        <div className="lg:sticky lg:top-4">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Articles dans votre panier
            </h2>

            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.size}`}
                  className="flex items-center space-x-4"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-gray-500">
                      Taille: {item.size.size || item.size} | Quantité: {item.quantity}
                    </p>
                    <p className="text-gray-900 font-medium">
                      {(item.price * item.quantity).toFixed(2)}cfa
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
