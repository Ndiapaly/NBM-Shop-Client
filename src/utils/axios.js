import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://nbm-shop-backend-5.onrender.com',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    console.log('Axios request config:', config);
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Axios request error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    console.log('Axios response:', response);
    return response;
  },
  (error) => {
    console.error('Axios response error:', error);
    return Promise.reject(error);
  }
);

export default instance;
