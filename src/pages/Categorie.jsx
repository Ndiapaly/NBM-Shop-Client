import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductsByCategory } from '../features/products/productsSlice';

// Icônes de catégories
const CategoryIcons = {
  running: '🏃‍♂️',
  basketball: '🏀',
  football: '⚽',
  casual: '👟',
  training: '💪',
  hiking: '🏔️'
};

const categories = [
  { 
    name: 'Running', 
    slug: 'running', 
    description: 'Chaussures légères et confortables pour les coureurs',
    color: 'bg-blue-100 hover:bg-blue-200'
  },
  { 
    name: 'Basketball', 
    slug: 'basketball', 
    description: 'Chaussures performantes pour les terrains de basket',
    color: 'bg-red-100 hover:bg-red-200'
  },
  { 
    name: 'Football', 
    slug: 'football', 
    description: 'Crampons de haute qualité pour les passionnés de foot',
    color: 'bg-green-100 hover:bg-green-200'
  },
  { 
    name: 'Casual', 
    slug: 'casual', 
    description: 'Style et confort pour votre quotidien',
    color: 'bg-gray-100 hover:bg-gray-200'
  },
  { 
    name: 'Training', 
    slug: 'training', 
    description: 'Chaussures polyvalentes pour vos séances d\'entraînement',
    color: 'bg-purple-100 hover:bg-purple-200'
  },
  { 
    name: 'Hiking', 
    slug: 'hiking', 
    description: 'Robustes et confortables pour vos randonnées',
    color: 'bg-yellow-100 hover:bg-yellow-200'
  }
];

const Categorie = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const dispatch = useDispatch();
  const { items: products, loading, error } = useSelector(state => state.products);

  useEffect(() => {
    if (selectedCategory) {
      dispatch(fetchProductsByCategory(selectedCategory));
    }
  }, [selectedCategory, dispatch]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <div 
            key={category.slug}
            onClick={() => setSelectedCategory(category.slug)}
            className={`
              ${category.color} 
              rounded-xl shadow-lg transform transition-all duration-300 
              hover:scale-105 cursor-pointer p-6 text-center
              ${selectedCategory === category.slug ? 'ring-4 ring-blue-500' : ''}
            `}
          >
            <div className="text-6xl mb-4 text-center">
              {CategoryIcons[category.slug]}
            </div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">
              {category.name}
            </h2>
            <p className="text-gray-600 mb-4">
              {category.description}
            </p>
            <Link 
              to={`/category/${category.slug}`} 
              className="
                inline-block bg-blue-500 text-white 
                px-4 py-2 rounded-full 
                hover:bg-blue-600 transition-colors
              "
            >
              Voir les produits
            </Link>
          </div>
        ))}
      </div>

      {selectedCategory && (
        <div className="mt-12 bg-gray-50 py-12 px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
            Produits de la catégorie {categories.find(c => c.slug === selectedCategory)?.name}
          </h2>
          
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center text-xl">
              {error}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center text-gray-500 text-xl">
              Aucun produit trouvé dans cette catégorie
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {products.map((product) => (
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
                    <div className="absolute top-4 right-4 bg-white/80 px-3 py-1 rounded-full text-sm font-semibold">
                      {product.brand}
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
                        // Ajoutez ici la logique d'ajout au panier
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
        </div>
      )}
    </div>
  );
};

export default Categorie;
