import { apiClient } from './axios';

export const messagesApi = {
  list: async () => {
    const { data } = await apiClient.get('/messages');
    return data.data;
  },
  updateStatus: async (id, status) => {
    const { data } = await apiClient.patch(`/messages/${id}`, { status });
    return data.data;
  },
  delete: async (id) => {
    const { data } = await apiClient.delete(`/messages/${id}`);
    return data.data;
  }
};
