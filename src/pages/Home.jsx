import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { fetchProducts } from '../features/products/productsSlice.js';
import ProductCard from '../components/ProductCard';
import { 
  ShoppingCartIcon, 
  StarIcon, 
  TruckIcon, 
  ShieldCheckIcon 
} from '@heroicons/react/24/solid';

const Home = () => {
  const dispatch = useDispatch();
  const { items: products, loading } = useSelector((state) => state.products);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    console.log('Dispatching fetchProducts');
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    // Sélectionner 4 produits aléatoires comme produits vedettes
    console.log('Produits reçus :', products);
    if (products.length > 0) {
      const shuffled = [...products].sort(() => 0.5 - Math.random());
      setFeaturedProducts(shuffled.slice(0, 4));
    }
  }, [products]);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative bg-white shadow-lg"
      >
        <div className="container mx-auto px-4 py-16 lg:py-24 grid md:grid-cols-2 items-center gap-12">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              MNBM-Shop
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Collection de Chaussures
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Les meilleures marques de chaussures au meilleur prix. Livraison gratuite à partir de 10000 cfa de panier d'achat. 
              Profitez des meilleures offres de nos partenaires de marque.
            </p>
            <div className="flex space-x-4">
              <Link 
                to="/produits" 
                className="btn-primary flex items-center space-x-2 px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                <ShoppingCartIcon className="h-6 w-6" />
                <span>Découvrir la Collection</span>
              </Link>
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="hidden md:block"
          >
            <img 
              src="https://i.pinimg.com/originals/1f/f5/94/1ff594ed96063b9db4866efaaa864ef6.gif" 
              alt="Collection de chaussures" 
              className="w-full h-auto transform hover:scale-105 transition-transform duration-300"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Avantages */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { 
              icon: <TruckIcon className="h-12 w-12 text-blue-600" />, 
              title: "Livraison Rapide", 
              description: "Livraison gratuite dès 10000 CFA" 
            },
            { 
              icon: <ShieldCheckIcon className="h-12 w-12 text-green-600" />, 
              title: "Garantie Qualité", 
              description: "Produits 100% authentiques" 
            },
            { 
              icon: <StarIcon className="h-12 w-12 text-yellow-600" />, 
              title: "Meilleurs Choix", 
              description: "Sélection des meilleures marques" 
            },
            { 
              icon: <ShoppingCartIcon className="h-12 w-12 text-purple-600" />, 
              title: "Paiement Sécurisé", 
              description: "Transactions 100% sécurisées" 
            }
          ].map((avantage, index) => (
            <motion.div 
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-all"
            >
              <div className="flex justify-center mb-4">
                {avantage.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {avantage.title}
              </h3>
              <p className="text-gray-600">
                {avantage.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Produits Vedettes */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Nos Produits Vedettes
        </h2>
        
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
          >
            {featuredProducts.map((product) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Call to Action */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Trouvez Votre Paire Parfaite
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Découvrez notre collection unique de chaussures. Qualité, style et confort vous attendent.
          </p>
          <Link 
            to="/produits" 
            className="btn-primary px-8 py-4 rounded-full text-lg hover:bg-white hover:text-blue-600 transition-all"
          >
            Voir Toute la Collection
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
