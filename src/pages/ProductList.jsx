import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/products/productsSlice';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';
import { 
  AdjustmentsHorizontalIcon, 
  MagnifyingGlassIcon 
} from '@heroicons/react/24/outline';

const ProductList = () => {
  const dispatch = useDispatch();
  const { items: products, loading, error } = useSelector((state) => state.products);
  const [filters, setFilters] = useState({
    category: '',
    brand: '',
    priceRange: '',
    sortBy: '',
    search: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    console.log('Dispatching fetchProducts');
    dispatch(fetchProducts());
  }, [dispatch]);

  console.log('Products state:', { products, loading, error });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredProducts = products.filter(product => {
    console.log('Filtering product:', product);
    const matchesSearch = filters.search === '' || 
      product.name.toLowerCase().includes(filters.search.toLowerCase());
    
    if (filters.category && product.category !== filters.category) return false;
    if (filters.brand && product.brand !== filters.brand) return false;
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      if (product.price < min || product.price > max) return false;
    }
    return matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen py-12 px-4">
      <div className="container mx-auto">
        {/* Titre et recherche */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            Découvrez Nos Produits
          </h1>
          <div className="max-w-xl mx-auto relative">
            <input 
              type="text" 
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Rechercher un produit..."
              className="w-full px-4 py-3 rounded-full border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            />
            <MagnifyingGlassIcon className="absolute right-4 top-3.5 h-6 w-6 text-blue-500" />
          </div>
        </motion.div>

        {/* Filtres */}
        <div className="mb-8 flex justify-center">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          >
            <AdjustmentsHorizontalIcon className="h-6 w-6 mr-2" />
            {showFilters ? 'Masquer les filtres' : 'Afficher les filtres'}
          </motion.button>
        </div>

        {showFilters && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-4 gap-4 mb-8 bg-white rounded-lg shadow-md p-6"
          >
            {/* Filtres détaillés */}
            <select 
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="bg-gray-100 border-2 border-blue-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Toutes les catégories</option>
              <option value="running">Running</option>
              <option value="casual">Casual</option>
              <option value="sport">Sport</option>
              <option value="sneakers">Sneakers</option>
              <option value="sandals">Sandales</option>
              <option value="boots">Bottes</option>
            </select>

            <select 
              name="brand"
              value={filters.brand}
              onChange={handleFilterChange}
              className="bg-gray-100 border-2 border-blue-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Toutes les marques</option>
              <option value="nike">Nike</option>
              <option value="adidas">Adidas</option>
              <option value="puma">Puma</option>
              <option value="jordan">Jordan</option>
              <option value="newbalance">New Balance</option>
              <option value="underarmour">Under Armour</option>
              <option value="converse">Converse</option>
              <option value="vans">Vans</option>
              <option value="reebok">Reebok</option>
              <option value="asics">Asics</option>
              <option value="timberland">Timberland</option>
            </select>

            <select 
              name="priceRange"
              value={filters.priceRange}
              onChange={handleFilterChange}
              className="bg-gray-100 border-2 border-blue-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tous les prix</option>
              <option value="0-12000">Moins de 12000 CFA</option>
              <option value="12000-18000">12000 - 18000 CFA</option>
              <option value="18000-30000">18000 - 30000 CFA</option>
              <option value="30000-99999">Plus de 30000 CFA</option>
            </select>

            <select 
              name="sortBy"
              value={filters.sortBy}
              onChange={handleFilterChange}
              className="bg-gray-100 border-2 border-blue-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Trier par</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="name-asc">Nom A-Z</option>
              <option value="name-desc">Nom Z-A</option>
            </select>
          </motion.div>
        )}

        {/* Liste de produits */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-600 text-xl">
            Erreur de chargement des produits
          </div>
        ) : sortedProducts.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-600 text-xl bg-white rounded-lg shadow-md p-12"
          >
            <p>Aucun produit ne correspond à vos critères.</p>
            <button 
              onClick={() => setFilters({
                category: '',
                brand: '',
                priceRange: '',
                sortBy: '',
                search: ''
              })}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
            >
              Réinitialiser les filtres
            </button>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {sortedProducts.map((product) => (
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
    </div>
  );
};

export default ProductList;
