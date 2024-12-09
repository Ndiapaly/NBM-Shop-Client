import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../features/products/productsSlice';

const Nouveaute = () => {
  const dispatch = useDispatch();
  const { items: products, loading, error } = useSelector((state) => state.products);

  const [sortedProducts, setSortedProducts] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    // Trier les produits par date de création (les plus récents en premier)
    if (products.length > 0) {
      const newProducts = [...products]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 12); // Limiter aux 12 produits les plus récents
      
      setSortedProducts(newProducts);
    }
  }, [products]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mt-12 mb-12 text-gray-800">
        Nos Dernières Nouveautés
      </h1>

      {loading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center text-xl">
          {error}
        </div>
      ) : sortedProducts.length === 0 ? (
        <div className="text-center text-gray-500 text-xl">
          Aucun nouveau produit disponible
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {sortedProducts.map((product) => (
            <div 
              key={product._id} 
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="relative">
                <img 
                  src={product.images[0]} 
                  alt={product.name} 
                  className="w-full h-56 object-cover"
                />
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Nouveau
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 mb-2">
                  {product.name}
                </h3>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-semibold text-blue-600">
                    {product.price.toFixed(2)} CFA
                  </span>
                  <div className="flex items-center text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i} 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`h-5 w-5 ${i < Math.round(product.rating) ? 'text-yellow-500' : 'text-gray-300'}`} 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-2 text-gray-600 text-sm">
                      ({product.numReviews})
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Link 
                    to={`/product/${product._id}`} 
                    className="flex-1 text-center bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600 transition-colors"
                  >
                    Détails
                  </Link>
                  <button 
                    className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-12">
        <Link 
          to="/produits" 
          className="bg-gray-800 text-white px-8 py-3 rounded-full hover:bg-gray-700 transition-colors text-lg"
        >
          Voir tous les produits
        </Link>
      </div>
    </div>
  );
};

export default Nouveaute;
