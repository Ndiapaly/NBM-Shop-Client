import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../features/products/productsSlice';
import { toast } from 'react-toastify';

const AddProduct = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.products);

  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    brand: '',
    sizes: [],
    images: []
  });

  const [newSize, setNewSize] = useState({ size: '', stock: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    setProductData(prev => ({
      ...prev,
      images: [...e.target.files]
    }));
  };

  const addSize = () => {
    if (newSize.size && newSize.stock) {
      setProductData(prev => ({
        ...prev,
        sizes: [...prev.sizes, { 
          size: parseFloat(newSize.size), 
          stock: parseInt(newSize.stock) 
        }]
      }));
      setNewSize({ size: '', stock: '' });
    }
  };

  const removeSize = (indexToRemove) => {
    setProductData(prev => ({
      ...prev,
      sizes: prev.sizes.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation de base
    if (!productData.name || !productData.description || !productData.price) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    try {
      await dispatch(addProduct(productData)).unwrap();
      toast.success('Produit ajouté avec succès');
      
      // Réinitialiser le formulaire
      setProductData({
        name: '',
        description: '',
        price: '',
        category: '',
        brand: '',
        sizes: [],
        images: []
      });
    } catch (err) {
      toast.error(err || 'Erreur lors de l\'ajout du produit');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Ajouter un Nouveau Produit</h1>
      
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nom du Produit */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">Nom du Produit</label>
            <input
              type="text"
              name="name"
              value={productData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>

          {/* Marque */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">Marque</label>
            <input
              type="text"
              name="brand"
              value={productData.brand}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-bold mb-2">Description</label>
            <textarea
              name="description"
              value={productData.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg"
              rows="4"
              required
            />
          </div>

          {/* Prix */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">Prix (€)</label>
            <input
              type="number"
              name="price"
              value={productData.price}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg"
              step="0.01"
              min="0"
              required
            />
          </div>

          {/* Catégorie */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">Catégorie</label>
            <select
              name="category"
              value={productData.category}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            >
              <option value="">Sélectionnez une catégorie</option>
              <option value="homme">Homme</option>
              <option value="femme">Femme</option>
              <option value="enfant">Enfant</option>
            </select>
          </div>

          {/* Tailles */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-bold mb-2">Tailles</label>
            <div className="flex space-x-2 mb-4">
              <input
                type="number"
                placeholder="Taille"
                value={newSize.size}
                onChange={(e) => setNewSize(prev => ({ ...prev, size: e.target.value }))}
                className="w-1/2 px-3 py-2 border rounded-lg"
              />
              <input
                type="number"
                placeholder="Stock"
                value={newSize.stock}
                onChange={(e) => setNewSize(prev => ({ ...prev, stock: e.target.value }))}
                className="w-1/2 px-3 py-2 border rounded-lg"
              />
              <button
                type="button"
                onClick={addSize}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Ajouter
              </button>
            </div>

            {/* Liste des tailles ajoutées */}
            <div className="flex flex-wrap gap-2">
              {productData.sizes.map((size, index) => (
                <span 
                  key={index} 
                  className="bg-gray-200 px-3 py-1 rounded-full flex items-center space-x-2"
                >
                  <span>{size.size} - Stock: {size.stock}</span>
                  <button 
                    type="button"
                    onClick={() => removeSize(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Images */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-bold mb-2">Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
            {/* Prévisualisation des images */}
            <div className="flex space-x-2 mt-4">
              {productData.images.map((image, index) => (
                <img 
                  key={index} 
                  src={URL.createObjectURL(image)} 
                  alt={`Preview ${index}`} 
                  className="w-20 h-20 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bouton de soumission */}
        <div className="mt-8 text-center">
          <button
            type="submit"
            disabled={loading}
            className={`px-8 py-3 rounded-full text-white font-bold ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600 transition-colors'
            }`}
          >
            {loading ? 'Ajout en cours...' : 'Ajouter le Produit'}
          </button>
        </div>

        {/* Gestion des erreurs */}
        {error && (
          <div className="mt-4 text-center text-red-500">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default AddProduct;
