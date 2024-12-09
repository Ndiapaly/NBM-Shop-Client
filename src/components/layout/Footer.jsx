import React from 'react';
import { Link } from 'react-router-dom';
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon 
} from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { 
      name: 'Facebook', 
      url: 'https://www.facebook.com/mnbmshop', 
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
        </svg>
      )
    },
    { 
      name: 'Instagram', 
      url: 'https://www.instagram.com/mnbmshop', 
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6m9.65 1.5a1.25 1.25 0 1 1-1.25 1.25A1.25 1.25 0 0 1 17.25 5.5M12 7a5 5 0 1 1-5 5a5 5 0 0 1 5-5m0 2a3 3 0 1 0 3 3a3 3 0 0 0-3-3z" />
        </svg>
      )
    },
    { 
      name: 'LinkedIn', 
      url: 'https://www.linkedin.com/company/mnbmshop', 
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.68 1.68 0 0 0-1.68 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
      )
    }
  ];

  const footerLinks = {
    Entreprise: [
      { name: 'À Propos', path: '/about' },
      { name: 'Carrières', path: '/careers' },
      { name: 'Presse', path: '/press' }
    ],
    Produits: [
      
      { name: 'Nouveautés', path: '/new-arrivals' },
      { name: 'Promotions', path: '/sales' }
    ],
    Support: [
      { name: 'Politique de Confidentialité', path: '/politique-confidentialite' },
      { name: 'FAQ', path: '/faq' },
      { name: 'Politique de Retour', path: '/politique-retour' },
      { name: 'Mes Commandes', path: '/orders' },
    ]
  };

  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900 text-white py-12"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Informations de Contact */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4">MNBM-Shop</h3>
            <div className="flex items-center space-x-3">
              <PhoneIcon className="h-6 w-6 text-primary" />
              <span>+221 77 123 45 67</span>
            </div>
            <div className="flex items-center space-x-3">
              <EnvelopeIcon className="h-6 w-6 text-primary" />
              <span>mnbmshop@gmail.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPinIcon className="h-6 w-6 text-primary" />
              <span>Dakar, Sénégal</span>
            </div>
          </div>

          {/* Liens Rapides */}
          <div className="grid grid-cols-3 gap-4">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="font-bold mb-3">{category}</h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.path}>
                      <Link 
                        to={link.path} 
                        className="text-gray-300 hover:text-white transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter et Réseaux Sociaux */}
          <div className="space-y-6">
            <div>
              <h4 className="font-bold mb-3">Restez Informé</h4>
              <form className="flex">
                <input 
                  type="email" 
                  placeholder="Votre email" 
                  className="w-full px-4 py-2 rounded-l-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button 
                  type="submit" 
                  className="bg-primary text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors"
                >
                  S'abonner
                </button>
              </form>
            </div>

            <div>
              <h4 className="font-bold mb-3">Suivez-nous</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors"
                    aria-label={`${social.name} de MNBM-Shop`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-sm text-gray-400">
            &copy; {currentYear} MNBM-Shop. Tous droits réservés.
          </p>
          <Link 
            to="/politique-confidentialite" 
            className="text-gray-400 hover:text-white transition-colors"
          >
            Politique de Confidentialité
          </Link>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
