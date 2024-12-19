import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';

const DEFAULT_API_URL = 'http://192.168.1.X:3000/api/v1';

class ApiService {
  private api = axios.create({
    baseURL: API_URL || DEFAULT_API_URL,
    headers: {
      'Content-Type': 'application/json'
    },
    timeout: 10000
  });

  constructor() {
    if (__DEV__) {
      console.log('API_URL:', API_URL || DEFAULT_API_URL);
    }
    
    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.api.interceptors.request.use(
      async (config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        if (__DEV__) {
          console.log('Request:', config.method?.toUpperCase(), config.url);
        }
        return config;
      },
      (error) => {
        if (__DEV__) {
          console.error('Request Error:', error);
        }
        return Promise.reject(error);
      }
    );

    this.api.interceptors.response.use(
      (response) => {
        if (__DEV__) {
          console.log('Response:', response.status, response.data);
        }
        return response;
      },
      (error) => {
        if (__DEV__) {
          console.error('Response Error:', {
            status: error.response?.status,
            data: error.response?.data,
            message: error.message
          });
        }
        return Promise.reject(this.handleError(error));
      }
    );
  }

  private handleError(error: any) {
    if (error.message === 'Network Error') {
      return new Error('Erreur de connexion au serveur. Vérifiez votre connexion internet.');
    }
    
    if (error.response) {
      return new Error(error.response.data?.message || 'Une erreur est survenue');
    }
    
    return error;
  }

  async login(email: string, password: string) {
    try {
      const response = await this.api.post('/auth/login', { email, password });
      await AsyncStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async register(userData: any) {
    try {
      const response = await this.api.post('/auth/register', userData);
      await AsyncStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }
}

export const apiService = new ApiService(); 