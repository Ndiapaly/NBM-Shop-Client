import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

// Thunk pour récupérer tous les produits
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ 
    page = 1, 
    limit = 10, 
    category, 
    nouveaute, 
    promotion 
  } = {}, { rejectWithValue }) => {
    try {
      console.log('Paramètres de requête :', { page, limit, category, nouveaute, promotion });
      
      const response = await axios.get('/api/products', {
        params: { page, limit, category, nouveaute, promotion }
      });
      
      console.log('Réponse complète :', response);
      console.log('Données de la réponse :', response.data);
      
      // Validation robuste de la réponse
      if (!response.data) {
        console.error('Réponse invalide : données manquantes');
        return rejectWithValue('Aucune donnée reçue');
      }

      // Vérifier la structure de la réponse
      if (!response.data.products) {
        console.error('Structure de réponse invalide', response.data);
        return rejectWithValue('Format de réponse incorrect');
      }

      // Validation des produits
      const products = response.data.products;
      if (!Array.isArray(products)) {
        console.error('Les produits ne sont pas un tableau', products);
        return rejectWithValue('Format des produits incorrect');
      }

      // Validation des champs des produits
      const invalidProducts = products.filter(product => 
        !product.name || !product.price || !product.category
      );

      if (invalidProducts.length > 0) {
        console.error('Produits invalides :', invalidProducts);
        return rejectWithValue('Certains produits ont des champs manquants');
      }
      
      return {
        products: products,
        totalPages: response.data.totalPages || 1,
        currentPage: response.data.currentPage || page
      };
    } catch (error) {
      console.error('Erreur complète lors de la récupération des produits :', error);
      
      // Gestion détaillée des erreurs
      if (error.response) {
        // La requête a été faite et le serveur a répondu avec un code d'erreur
        console.error('Erreur de réponse :', {
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers
        });

        return rejectWithValue({
          message: error.response.data.message || 'Erreur lors de la récupération des produits',
          status: error.response.status
        });
      } else if (error.request) {
        // La requête a été faite mais pas de réponse
        console.error('Pas de réponse reçue', error.request);
        return rejectWithValue('Aucune réponse du serveur');
      } else {
        // Quelque chose s\'est passé lors de la configuration de la requête
        console.error('Erreur de configuration', error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);

// Thunk pour ajouter un nouveau produit
export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      
      // Ajouter tous les champs du produit
      Object.keys(productData).forEach(key => {
        if (key === 'images') {
          // Ajouter chaque image
          productData.images.forEach(image => {
            formData.append('images', image);
          });
        } else if (key === 'sizes') {
          // Convertir les tailles en JSON
          formData.append(key, JSON.stringify(productData[key]));
        } else {
          formData.append(key, productData[key]);
        }
      });

      const response = await axios.post('/api/produits', formData, {
        headers: { 
          'Content-Type': 'multipart/form-data' 
        }
      });
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Erreur lors de l\'ajout du produit');
    }
  }
);

// Thunk pour récupérer un produit par son ID
export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/produits/${productId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Erreur lors de la récupération du produit');
    }
  }
);

// Thunk pour récupérer les produits par catégorie
export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchByCategory',
  async (category, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/produits', {
        params: { category }
      });
      return response.data.products;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Erreur lors de la récupération des produits'
      );
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    totalPages: 0,
    currentPage: 1,
    loading: false,
    error: null,
    productToAdd: null,
    selectedCategory: null,
    currentProduct: null
  },
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    }
  },
  extraReducers: (builder) => {
    // Récupération des produits
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload.products;
      state.totalPages = action.payload.totalPages;
      state.currentPage = action.payload.currentPage;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Ajout de produit
    builder.addCase(addProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.items.push(action.payload);
      state.productToAdd = null;
    });
    builder.addCase(addProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Récupération d'un produit par ID
    builder.addCase(fetchProductById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      state.loading = false;
      state.currentProduct = action.payload;
    });
    builder.addCase(fetchProductById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Récupération des produits par catégorie
    builder.addCase(fetchProductsByCategory.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProductsByCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
    });
    builder.addCase(fetchProductsByCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  }
});

export const { setSelectedCategory } = productsSlice.actions;
export default productsSlice.reducer;
