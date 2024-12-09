import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheckIcon } from '@heroicons/react/24/solid';

const PolitiqueConfidentialite = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto"
      >
        <motion.div 
          variants={sectionVariants}
          className="text-center mb-12"
        >
          <ShieldCheckIcon className="mx-auto h-16 w-16 text-blue-600 mb-4" />
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Politique de Confidentialité
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Dernière mise à jour : 09 Décembre 2024
          </p>
        </motion.div>

        <motion.section 
          variants={sectionVariants}
          className="bg-white shadow-lg rounded-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Informations que nous collectons</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Informations personnelles (nom, email, adresse)</li>
            <li>Données de paiement (cryptées et sécurisées)</li>
            <li>Historique de commandes</li>
            <li>Préférences de navigation</li>
          </ul>
        </motion.section>

        <motion.section 
          variants={sectionVariants}
          className="bg-white shadow-lg rounded-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Comment nous utilisons vos données</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Traitement et suivi des commandes</li>
            <li>Communication sur vos achats</li>
            <li>Personnalisation de votre expérience</li>
            <li>Amélioration de nos services</li>
          </ul>
        </motion.section>

        <motion.section 
          variants={sectionVariants}
          className="bg-white shadow-lg rounded-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Protection de vos données</h2>
          <p className="text-gray-700 mb-4">
            Nous mettons en œuvre des mesures de sécurité avancées pour protéger vos informations personnelles :
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Cryptage SSL/TLS</li>
            <li>Pare-feux de dernière génération</li>
            <li>Authentification à deux facteurs</li>
            <li>Mises à jour de sécurité régulières</li>
          </ul>
        </motion.section>

        <motion.section 
          variants={sectionVariants}
          className="bg-white shadow-lg rounded-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Vos droits</h2>
          <p className="text-gray-700 mb-4">
            Conformément à la réglementation sur la protection des données, vous disposez des droits suivants :
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Droit d'accès à vos données</li>
            <li>Droit de rectification</li>
            <li>Droit à la suppression</li>
            <li>Droit de limitation du traitement</li>
            <li>Droit à la portabilité des données</li>
          </ul>
        </motion.section>

        <motion.section 
          variants={sectionVariants}
          className="bg-white shadow-lg rounded-xl p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Contact</h2>
          <p className="text-gray-700">
            Pour toute question relative à votre vie privée, contactez notre délégué à la protection des données :
          </p>
          <div className="mt-4 bg-blue-50 p-4 rounded-lg">
            <p className="font-semibold text-blue-800">Email : dpo@mnbm-shop.com</p>
            <p className="text-blue-700">Téléphone : +221 77 123 45 67</p>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
};

export default PolitiqueConfidentialite;
