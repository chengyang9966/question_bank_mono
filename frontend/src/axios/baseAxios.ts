import axios from 'axios';

const refreshTokenUrl = 'http://localhost:3077/api/v1/auth/refresh-tokens';
const baseUrl = 'http://localhost:3077';

const baseAxios = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

baseAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
baseAxios.interceptors.response.use(
  (response) => response, // Directly return successful responses.
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.
      try {
        const refreshToken = localStorage.getItem('refreshToken'); // Retrieve the stored refresh token.
        // Make a request to your auth server to refresh the token.
        const response = await axios.post(refreshTokenUrl, {
          refreshToken,
        });
        const {
          access: { token: accessToken },
          refresh: { token: newRefreshToken },
        } = response.data;
        // Store the new access and refresh tokens.
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', newRefreshToken);
        // Update the authorization header with the new access token.
        baseAxios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        return baseAxios(originalRequest); // Retry the original request with the new access token.
      } catch (refreshError) {
        // Handle refresh token errors by clearing stored tokens and redirecting to the login page.
        console.error('Token refresh failed:', refreshError);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error); // For all other errors, return the error as is.
  },
);

export default baseAxios;
