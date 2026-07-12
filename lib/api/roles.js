import { apiClient } from "./axios";

export const rolesApi = {
  list: async () => {
    const { data } = await apiClient.get("/rbac/roles");
    return data.data;
  },
  create: async (payload) => {
    const { data } = await apiClient.post("/rbac/roles", payload);
    return data.data;
  },
  update: async (id, payload) => {
    const { data } = await apiClient.put(`/rbac/roles/${id}`, payload);
    return data.data;
  },
  delete: async (id) => {
    const { data } = await apiClient.delete(`/rbac/roles/${id}`);
    return data.data;
  },
  getPermissions: async () => {
    const { data } = await apiClient.get("/rbac/permissions");
    return data.data;
  }
};