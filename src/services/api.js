import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL + "/api" || "http://localhost:3001/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const userApi = {
  getUsers: () => api.get("/users"),
  getUserById: (id) => api.get(`/users/${id}`),
};

export const transactionApi = {
  getTransactions: () => api.get("/transactions"),
  getTransactionsByUserId: (userId) => api.get(`/transactions/user/${userId}`),
};

export const uploadApi = {
  uploadZip: (formData) =>
    api.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
};

export default api;
