
/**
 * API Configuration for connecting to the Django backend
 */

// Base URL for API requests
export const API_BASE_URL = 'http://localhost:8000/api';

// API endpoints organized by feature
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login/',
    REGISTER: '/auth/register/',
    LOGOUT: '/auth/logout/',
    REFRESH_TOKEN: '/auth/token/refresh/',
    PROFILE: '/auth/profile/',
  },
  // Diet related endpoints
  DIET: {
    MEALS: '/diet/meals/',
    RECIPES: '/diet/recipes/',
    NUTRITION: '/diet/nutrition/',
    GOALS: '/diet/goals/',
  },
  // Health tracking
  HEALTH: {
    VITALS: '/health/vitals/',
    ACTIVITIES: '/health/activities/',
    PROGRESS: '/health/progress/',
  },
  // Facilities
  FACILITIES: {
    NEARBY: '/facilities/nearby/',
    SEARCH: '/facilities/search/',
    DETAILS: '/facilities/details/',
  },
  // Chatbot
  CHATBOT: {
    MESSAGE: '/chatbot/message/',
    OFFLINE_DATA: '/chatbot/offline-data/',
  },
  // User settings
  SETTINGS: {
    PREFERENCES: '/settings/preferences/',
    LANGUAGE: '/settings/language/',
    ACCESSIBILITY: '/settings/accessibility/',
  }
};

// Request timeout in milliseconds
export const REQUEST_TIMEOUT = 30000;

// Default headers for API requests
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};
