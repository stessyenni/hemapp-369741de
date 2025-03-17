
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { API_BASE_URL, DEFAULT_HEADERS, REQUEST_TIMEOUT } from '../config/apiConfig';
import { toast } from 'sonner';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT,
  headers: DEFAULT_HEADERS,
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling common errors
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const { response } = error;
    
    if (response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('auth_token');
      toast.error('Your session has expired. Please log in again.');
      // You can add redirect to login here if needed
    } else if (response?.status === 500) {
      toast.error('Server error. Please try again later.');
    } else if (!response) {
      toast.error('Network error. Please check your connection.');
    }
    
    return Promise.reject(error);
  }
);

// Generic API service methods
export const apiService = {
  /**
   * Make a GET request
   */
  get: <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return apiClient.get(url, config).then((response: AxiosResponse<T>) => response.data);
  },
  
  /**
   * Make a POST request
   */
  post: <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    return apiClient.post(url, data, config).then((response: AxiosResponse<T>) => response.data);
  },
  
  /**
   * Make a PUT request
   */
  put: <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    return apiClient.put(url, data, config).then((response: AxiosResponse<T>) => response.data);
  },
  
  /**
   * Make a PATCH request
   */
  patch: <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    return apiClient.patch(url, data, config).then((response: AxiosResponse<T>) => response.data);
  },
  
  /**
   * Make a DELETE request
   */
  delete: <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return apiClient.delete(url, config).then((response: AxiosResponse<T>) => response.data);
  },
  
  /**
   * Check if the backend is available
   */
  healthCheck: (): Promise<boolean> => {
    return apiClient.get('/health-check/')
      .then(() => true)
      .catch(() => false);
  }
};

// Example usage for specific features:
export const authService = {
  login: (username: string, password: string) => {
    return apiService.post('/auth/login/', { username, password });
  },
  logout: () => {
    return apiService.post('/auth/logout/').finally(() => {
      localStorage.removeItem('auth_token');
    });
  },
  getProfile: () => {
    return apiService.get('/auth/profile/');
  }
};

export const dietService = {
  getMeals: (date?: string) => {
    return apiService.get(`/diet/meals/${date ? `?date=${date}` : ''}`);
  },
  getRecipes: (query?: string) => {
    return apiService.get(`/diet/recipes/${query ? `?query=${query}` : ''}`);
  },
  addMeal: (mealData: any) => {
    return apiService.post('/diet/meals/', mealData);
  }
};

export const healthTrackingService = {
  getVitals: (range?: string) => {
    return apiService.get(`/health/vitals/${range ? `?range=${range}` : ''}`);
  },
  addVitalReading: (readingData: any) => {
    return apiService.post('/health/vitals/', readingData);
  }
};

export const facilityService = {
  getNearbyFacilities: (lat: number, lng: number, radius?: number) => {
    return apiService.get(`/facilities/nearby/?lat=${lat}&lng=${lng}${radius ? `&radius=${radius}` : ''}`);
  },
  searchFacilities: (query: string) => {
    return apiService.get(`/facilities/search/?query=${query}`);
  }
};

export const chatbotService = {
  sendMessage: (message: string) => {
    return apiService.post('/chatbot/message/', { message });
  },
  getOfflineData: () => {
    return apiService.get('/chatbot/offline-data/');
  }
};
