import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

// Inscription
export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/auth/register', userData);
      
      // Vérifier que les données sont valides avant de les stocker
      if (response.data && response.data.token && response.data.user) {
        localStorage.setItem('token', response.data.token);
        
        // Nettoyer les données utilisateur avant le stockage
        const cleanUserData = {
          id: response.data.user.id,
          username: response.data.user.username,
          email: response.data.user.email,
          firstName: response.data.user.firstName,
          lastName: response.data.user.lastName
        };
        
        localStorage.setItem('user', JSON.stringify(cleanUserData));
        return cleanUserData;
      } else {
        throw new Error('Données de réponse invalides');
      }
    } catch (error) {
      // Gérer les erreurs de l'API
      const message = error.response?.data?.message || 
                      error.response?.data?.errors?.[0]?.msg || 
                      'Erreur lors de l\'inscription';
      
      return rejectWithValue(message);
    }
  }
);

// Connexion
export const login = createAsyncThunk(
  'auth/login',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/auth/login', userData);
      
      // Vérifier que les données sont valides avant de les stocker
      if (response.data && response.data.token && response.data.user) {
        localStorage.setItem('token', response.data.token);
        
        // Nettoyer les données utilisateur avant le stockage
        const cleanUserData = {
          id: response.data.user.id,
          username: response.data.user.username,
          email: response.data.user.email,
          firstName: response.data.user.firstName,
          lastName: response.data.user.lastName
        };
        
        localStorage.setItem('user', JSON.stringify(cleanUserData));
        return cleanUserData;
      } else {
        throw new Error('Données de réponse invalides');
      }
    } catch (error) {
      // Gérer les erreurs de l'API
      const message = error.response?.data?.message || 
                      error.response?.data?.errors?.[0]?.msg || 
                      'Erreur lors de la connexion';
      
      return rejectWithValue(message);
    }
  }
);

// Mise à jour du profil utilisateur
export const updateUserProfile = createAsyncThunk(
  'auth/updateProfile',
  async (userData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('/api/auth/profile', userData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // Mettre à jour les informations utilisateur dans le localStorage
      localStorage.setItem('user', JSON.stringify(response.data));
      
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 
                      error.response?.data?.errors?.[0]?.msg || 
                      'Mise à jour du profil impossible';
      
      return rejectWithValue(message);
    }
  }
);

// Déconnexion
export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    // Supprimer le token et les informations utilisateur
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return null;
  }
);

// Récupérer l'utilisateur connecté
export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return rejectWithValue('Aucun token trouvé');
      }

      const response = await axios.get('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return response.data;
    } catch (error) {
      // En cas d'erreur (token invalide, etc.), déconnecter l'utilisateur
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return rejectWithValue('Impossible de récupérer l\'utilisateur');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: (() => {
      try {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
      } catch (error) {
        // Si le parsing échoue, supprimer l'élément corrompu
        localStorage.removeItem('user');
        return null;
      }
    })(),
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
    isAuthenticated: !!localStorage.getItem('token')
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Inscription
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      
      // Connexion
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      
      // Mise à jour du profil
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Déconnexion
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      
      // Récupérer l'utilisateur
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  }
});

export default authSlice.reducer;
