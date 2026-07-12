import { apiClient } from "./axios";

export const servicesApi = {
  list: async () => {
    const { data } = await apiClient.get("/services");
    return data.data;
  },
  get: async (id) => {
    const { data } = await apiClient.get(`/services/${id}`);
    return data.data;
  },
  create: async (payload) => {
    const { data } = await apiClient.post("/services", payload);
    return data.data;
  },
  update: async (id, payload) => {
    const { data } = await apiClient.put(`/services/${id}`, payload);
    return data.data;
  },
  delete: async (id) => {
    const { data } = await apiClient.delete(`/services/${id}`);
    return data.data;
  }
};