import { apiClient } from "./axios";

export const usersApi = {
  list: async () => {
    const { data } = await apiClient.get("/users");
    return data.data;
  },
  create: async (payload) => {
    const { data } = await apiClient.post("/users", payload);
    return data.data;
  },
  update: async (id, payload) => {
    const { data } = await apiClient.put(`/users/${id}`, payload);
    return data.data;
  },
  delete: async (id) => {
    const { data } = await apiClient.delete(`/users/${id}`);
    return data.data;
  }
};