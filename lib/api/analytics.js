import { apiClient } from "./axios";

export const analyticsApi = {
  getStats: async (range = "last30") => {
    const { data } = await apiClient.get(`/analytics?range=${range}`);
    return data.data;
  },
};
