import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon, 
  PaperAirplaneIcon 
} from '@heroicons/react/24/solid';
import { toast } from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation simple
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setIsLoading(true);

    try {
      // Envoi de l'email via l'API backend
      const response = await axios.post('/api/contact/send-email', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || 'Non spécifié',
        message: formData.message
      });

      // Message envoyé avec succès
      toast.success(response.data.message || 'Votre message a été envoyé avec succès !');
      
      // Réinitialisation du formulaire
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      // Gestion des erreurs
      console.error('Erreur lors de l\'envoi du message:', error);
      toast.error(
        error.response?.data?.message || 
        'Une erreur est survenue. Veuillez réessayer.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 flex flex-col lg:flex-row"
    >
      {/* Section Informations de Contact - Responsive */}
      <div className="w-full lg:w-1/2 bg-blue-600 text-white p-8 md:p-12 lg:p-16 flex flex-col justify-center">
        <motion.h1 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
        >
          Contactez-nous
        </motion.h1>
        
        <div className="space-y-4 text-sm md:text-base">
          <div className="flex items-center space-x-3">
            <PhoneIcon className="h-6 w-6" />
            <span>+221 77 123 45 67</span>
          </div>
          <div className="flex items-center space-x-3">
            <EnvelopeIcon className="h-6 w-6" />
            <span>mnbmshop@gmail.com</span>
          </div>
          <div className="flex items-center space-x-3">
            <MapPinIcon className="h-6 w-6" />
            <span>Dakar, Sénégal</span>
          </div>
        </div>
      </div>

      {/* Formulaire de Contact - Responsive */}
      <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex items-center justify-center">
        <motion.form 
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 space-y-6"
        >
          {/* Champs de formulaire avec responsive design */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Votre Nom"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Votre Email"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <input 
            type="tel" 
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Votre Téléphone (Optionnel)"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea 
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Votre Message"
            required
            rows="4"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full btn-primary flex items-center justify-center space-x-2 px-6 py-4 rounded-full text-lg hover:bg-blue-700 transition-all disabled:opacity-50"
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <PaperAirplaneIcon className="h-6 w-6" />
            )}
            <span>Envoyer le Message</span>
          </button>
        </motion.form>
      </div>
    </motion.div>
  );
};

export default Contact;
