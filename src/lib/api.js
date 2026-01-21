/**
 * API Client for ServiceHub
 * Handles all HTTP requests with JWT authentication
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api';

/**
 * Get authentication token from localStorage
 */
const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token');
  }
  return null;
};

/**
 * Set authentication token
 */
export const setToken = (token) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', token);
  }
};

/**
 * Remove authentication token
 */
export const removeToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token');
  }
};

/**
 * Base fetch wrapper with authentication and error handling
 */
async function fetchAPI(endpoint, options = {}) {
  const token = getToken();
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  // Handle FormData - don't set Content-Type header
  if (options.body instanceof FormData) {
    delete defaultHeaders['Content-Type'];
  }

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, config);
    
    // Handle no content responses
    if (response.status === 204) {
      return { success: true };
    }

    const data = await response.json();

    if (!response.ok) {
      throw {
        status: response.status,
        message: data.message || data.error || 'An error occurred',
        data,
      };
    }

    return data;
  } catch (error) {
    // Network error or parsing error
    if (!error.status) {
      throw {
        status: 0,
        message: 'Network error. Please check your connection.',
        data: null,
      };
    }
    throw error;
  }
}

/**
 * AUTH API
 */
export const authAPI = {
  login: (credentials) => 
    fetchAPI('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
  
  register: (userData) =>
    fetchAPI('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
  
  logout: () => {
    removeToken();
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
  },
};

/**
 * USERS API
 */
export const usersAPI = {
  getAll: () => fetchAPI('/users'),
  
  getById: (id) => fetchAPI(`/users/${id}`),
  
  getFullInfo: (id) => fetchAPI(`/users/${id}/full-info`),
};

/**
 * CATEGORIES API
 */
export const categoriesAPI = {
  getAll: () => fetchAPI('/categories'),
  
  getActiveWorkers: () => fetchAPI('/categories/active-workers'),
};

/**
 * PORTFOLIOS API
 */
export const portfoliosAPI = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return fetchAPI(`/portfolios${queryString ? `?${queryString}` : ''}`);
  },
  
  getById: (id) => fetchAPI(`/portfolios/${id}`),
};

/**
 * PORTFOLIO IMAGES API
 */
export const portfolioImagesAPI = {
  getByPortfolioId: (portfolioId) => 
    fetchAPI(`/portfolio-images?portfolio_id=${portfolioId}`),
  
  upload: (formData) =>
    fetchAPI('/portfolio-images/upload', {
      method: 'POST',
      body: formData,
    }),
};

/**
 * COMMENTS API
 */
export const commentsAPI = {
  getByPortfolioId: (portfolioId) => 
    fetchAPI(`/comments/${portfolioId}`),
  
  create: (commentData) =>
    fetchAPI('/comments', {
      method: 'POST',
      body: JSON.stringify(commentData),
    }),
};

/**
 * JOB REQUESTS API
 */
export const jobRequestsAPI = {
  create: (requestData) =>
    fetchAPI('/job-requests', {
      method: 'POST',
      body: JSON.stringify(requestData),
    }),
  
  getMy: () => fetchAPI('/job-requests/my'),
  
  accept: (id) =>
    fetchAPI(`/job-requests/${id}/accept`, {
      method: 'PATCH',
    }),
  
  reject: (id) =>
    fetchAPI(`/job-requests/${id}/reject`, {
      method: 'PATCH',
    }),
};

/**
 * NOTIFICATIONS API
 */
export const notificationsAPI = {
  getAll: () => fetchAPI('/notifications'),
  
  markAsRead: (id) =>
    fetchAPI(`/notifications/${id}/read`, {
      method: 'PATCH',
    }),
};

export default {
  auth: authAPI,
  users: usersAPI,
  categories: categoriesAPI,
  portfolios: portfoliosAPI,
  portfolioImages: portfolioImagesAPI,
  comments: commentsAPI,
  jobRequests: jobRequestsAPI,
  notifications: notificationsAPI,
};
