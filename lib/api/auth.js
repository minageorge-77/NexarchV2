import { apiClient } from "./axios";

export const authApi = {
  login: async (credentials) => {
    const { data } = await apiClient.post("/auth/login", credentials);
    return data;
  },
  logout: async () => {
    const { data } = await apiClient.post("/auth/logout");
    return data;
  }
};