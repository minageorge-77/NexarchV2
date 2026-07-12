import { apiClient } from "./axios";

export const analyticsApi = {
  getOverview: async (params) => {
    const { data } = await apiClient.get("/analytics/overview", { params });
    return data.data;
  },
  getTopPages: async (params) => {
    const { data } = await apiClient.get("/analytics/top-pages", { params });
    return data.data;
  },
  getTrafficSources: async (params) => {
    const { data } = await apiClient.get("/analytics/traffic-sources", { params });
    return data.data;
  },
  getDevices: async (params) => {
    const { data } = await apiClient.get("/analytics/devices", { params });
    return data.data;
  },
  getCountries: async (params) => {
    const { data } = await apiClient.get("/analytics/countries", { params });
    return data.data;
  }
};