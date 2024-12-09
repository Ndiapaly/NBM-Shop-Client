import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import { addToWishlist, removeFromWishlist } from '../features/wishlist/wishlistSlice';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { HeartIcon } from '@heroicons/react/24/solid';
import { HeartIcon as HeartOutlineIcon } from '@heroicons/react/24/outline';

const ProductCard = ({ product }) => {
  console.log('Rendu ProductCard avec produit :', product);
  
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  
  // Récupérer les articles de la wishlist
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isInWishlist = wishlistItems.some(item => item._id === product._id);

  const handleAddToCart = () => {
    dispatch(addToCart({ 
      productId: product._id,
      quantity: 1,
      size: product.sizes[0].size,
      name: product.name,
      price: product.price,
      imageUrl: product.images[0]
    }));
    
    toast.success(
      <div className="flex items-center">
        <img src={product.images[0]} alt={product.name} className="w-10 h-10 object-cover rounded mr-3" />
        <div>
          <p className="font-semibold">Produit ajouté au panier</p>
          <p className="text-sm text-gray-600">{product.name}</p>
        </div>
      </div>,
      {
        duration: 3000,
        position: 'bottom-right',
        style: {
          background: '#fff',
          color: '#333',
          padding: '16px',
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        },
      }
    );
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault(); // Empêcher la navigation vers la page de détail
    if (isInWishlist) {
      dispatch(removeFromWishlist(product._id));
      toast.error('Retiré des favoris', {
        position: 'bottom-right',
      });
    } else {
      dispatch(addToWishlist(product));
      toast.success('Ajouté aux favoris', {
        position: 'bottom-right',
      });
    }
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm overflow-hidden transform transition-all duration-300 hover:shadow-xl relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Bouton Wishlist */}
      <motion.button
        onClick={handleToggleWishlist}
        className={`absolute top-4 right-4 z-10 p-2 rounded-full transition-colors duration-300 ${
          isInWishlist 
            ? 'bg-red-100 text-red-600 hover:bg-red-200' 
            : 'bg-white bg-opacity-70 text-gray-500 hover:bg-opacity-100 hover:text-red-600'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isInWishlist ? (
          <HeartIcon className="h-6 w-6" />
        ) : (
          <HeartOutlineIcon className="h-6 w-6" />
        )}
      </motion.button>

      <div className="relative">
        <Link to={`/product/${product._id}`}>
          <div className="relative h-72 overflow-hidden">
            <motion.img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
              animate={{
                scale: isHovered ? 1.1 : 1
              }}
              transition={{ duration: 0.4 }}
            />
            {product.brand && (
              <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
                {product.brand}
              </div>
            )}
          </div>
        </Link>
        
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center"
            >
              <motion.button
                onClick={handleAddToCart}
                className="bg-white text-gray-900 p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors transform"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="p-6">
        <Link to={`/product/${product._id}`}>
          <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <motion.p 
          className="text-gray-600 text-sm mb-4 line-clamp-2 h-10"
          animate={{
            opacity: isHovered ? 0.8 : 1
          }}
        >
          {product.description}
        </motion.p>
        
        <div className="flex items-center justify-between">
          <div>
            <motion.span 
              className="text-2xl font-bold text-gray-900"
              animate={{
                scale: isHovered ? 1.05 : 1
              }}
            >
              {product.price}cfa
            </motion.span>
            <div className="text-sm text-gray-500 mt-1">
              {product.sizes.length} tailles disponibles
            </div>
          </div>
          
          <div className="flex gap-1">
            {product.sizes.slice(0, 3).map((s, index) => (
              <motion.span 
                key={index} 
                className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                animate={{
                  y: isHovered ? -2 : 0
                }}
                transition={{ delay: index * 0.1 }}
              >
                {s.size}
              </motion.span>
            ))}
            {product.sizes.length > 3 && (
              <motion.span 
                className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                animate={{
                  y: isHovered ? -2 : 0
                }}
                transition={{ delay: 0.3 }}
              >
                +{product.sizes.length - 3}
              </motion.span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
