import { apiClient } from "./axios";

export const testimonialsApi = {
  list: async () => {
    const { data } = await apiClient.get("/testimonials");
    return data.data;
  },
  get: async (id) => {
    const { data } = await apiClient.get(`/testimonials/${id}`);
    return data.data;
  },
  create: async (payload) => {
    const { data } = await apiClient.post("/testimonials", payload);
    return data.data;
  },
  update: async (id, payload) => {
    const { data } = await apiClient.put(`/testimonials/${id}`, payload);
    return data.data;
  },
  delete: async (id) => {
    const { data } = await apiClient.delete(`/testimonials/${id}`);
    return data.data;
  }
};