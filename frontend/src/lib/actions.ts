import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL + "/api" || "https://api.sharemeal.vishalrai.tech/api"

// Helper function to get auth header
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};

// Helper function to handle API errors
const handleApiError = (error: any) => {
  console.error("API Error:", error);
  throw {
    message: error.response?.data?.error || "Something went wrong",
    status: error.response?.status || 500,
  };
};

// Dashboard Actions
export const dashboardActions = {
  getProfile: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/dashboard/profile`, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  updateProfile: async (data: any) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/dashboard/profile`, data, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  getStats: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/dashboard/stats`, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  getDonations: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/dashboard/donations`, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  getClaims: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/dashboard/claims`, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },
};

// Food Listing Actions
export const foodListingActions = {
  getAllListings: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/food-listings`, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  createListing: async (data: any) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/food-listings`, data, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  claimListing: async (listingId: string) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/food-listings/${listingId}/claim`,
        {},
        {
          headers: getAuthHeader(),
        }
      );
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },
};

// Auth Actions
export const authActions = {
  login: async (data: { email: string; password: string }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, data);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("role", response.data.user.role);
      }
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  register: async (data: {
    name: string;
    email: string;
    password: string;
    role: string;
    number: string;
    address: string;
    city: string;
    pincode: string;
  }, category: string) => {
    try {
      const endpoint = category === "Donor" ? "/auth/register/donar" : "/auth/register/receiver";
      console.log(endpoint)
      const response = await axios.post(`${API_BASE_URL}${endpoint}`, data);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },
};



