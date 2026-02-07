import axios from 'axios';

const API_URL = 'http://localhost:5173/api/auth'; 

/**
 * AUTH SERVICE MODULE
 * This file connects your Frontend UI to your Database
 */
const authService = {

  // 1. SIGNUP: Sends new user data to the database
  signup: async (userData) => {
    try {
      // userData should be { name, email, password, etc. }
      const response = await axios.post(`${API_URL}/signup`, userData);
      return response.data; 
    } catch (error) {
      throw error.response?.data?.message || "Signup failed. Please try again.";
    }
  },

  // 2. LOGIN: Validates credentials and receives a security Token
  login: async (credentials) => {
    try {
      // credentials should be { email, password }
      const response = await axios.post(`${API_URL}/login`, credentials);
      
      // If your backend sends a JWT token, save it for protected modules
      if (response.data.token) {
        localStorage.setItem('userToken', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Invalid email or password.";
    }
  },

  // 3. FORGOT PASSWORD: Asks backend to send the reset email
  sendResetLink: async (email) => {
    try {
      const response = await axios.post(`${API_URL}/forgot-password`, { email });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Email not found in our records.";
    }
  },

  // 4. RESET PASSWORD: Sends the NEW password and the TOKEN from the email
  resetPassword: async (token, newPassword) => {
    try {
      const response = await axios.post(`${API_URL}/reset-password`, { 
        token, 
        password: newPassword 
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Reset link expired or invalid.";
    }
  },

  // 5. LOGOUT: Clears the session
  logout: () => {
    localStorage.removeItem('userToken');
    window.location.href = '/login';
  },
  // Add this inside your authService object
updateProfile: async (profileData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.put(`${API_URL}/user/update-profile`, profileData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Failed to update profile";
    }
}
};

export default authService;