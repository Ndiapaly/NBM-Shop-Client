import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fetchWishlist, removeFromWishlist } from '../../features/wishlist/wishlistSlice';
import { addToCart } from '../../features/cart/cartSlice';
import { HeartIcon } from '@heroicons/react/24/solid';
import toast from 'react-hot-toast';

const WishList = () => {
  const dispatch = useDispatch();
  const { items: wishlistItems, loading, error } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeFromWishlist(productId));
    toast.error('Produit retiré des favoris', {
      position: 'bottom-right',
    });
  };

  const handleAddToCart = (product) => {
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-8">
        <p>Erreur lors du chargement de la wishlist : {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <HeartIcon className="h-10 w-10 text-red-500 mr-4" />
        <h1 className="text-3xl font-bold text-gray-800">Ma Liste de Favoris</h1>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-16">
          <HeartIcon className="h-24 w-24 text-gray-300 mx-auto mb-6" />
          <p className="text-xl text-gray-600">Votre liste de favoris est vide</p>
          <Link 
            to="/productlist" 
            className="mt-4 inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Découvrir des produits
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((product) => (
            <motion.div
              key={product._id}
              className="bg-white rounded-xl shadow-md overflow-hidden relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => handleRemoveFromWishlist(product._id)}
                className="absolute top-4 right-4 z-10 bg-red-100 text-red-600 p-2 rounded-full hover:bg-red-200 transition-colors"
              >
                <HeartIcon className="h-6 w-6" />
              </button>

              <Link to={`/product/${product._id}`}>
                <div className="h-64 overflow-hidden">
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="w-full h-full object-cover hover:scale-110 transition-transform"
                  />
                </div>
              </Link>

              <div className="p-6">
                <Link to={`/product/${product._id}`}>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                </Link>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">
                    {product.price} cfa
                  </span>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Ajouter au panier
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishList;