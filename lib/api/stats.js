import { apiClient } from "./axios";

export const statsApi = {
  get: async () => {
    const { data } = await apiClient.get("/stats");
    return data.data;
  },
  update: async (payload) => {
    const { data } = await apiClient.put("/stats", payload);
    return data.data;
  },
};
