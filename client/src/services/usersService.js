
import axiosClient from '../api/Axios';

export const getAllUsers = async () => {
  const { data } = await axiosClient.get('/users');
  return data;
};

export const getUserById = async (id) => {
  const { data } = await axiosClient.get(`/users/${id}`);
  return data;
};

export const createUser = async (userData) => {
  const { data } = await axiosClient.post('/users', userData);
  return data;
};

export const updateUser = async (id, userData) => {
  const { data } = await axiosClient.put(`/users/${id}`, userData);
  return data;
};

export const deleteUser = async (id) => {
  const { data } = await axiosClient.delete(`/users/${id}`);
  return data;
};

export const changeMyPassword = async (passwordData) => {
  const { data } = await axiosClient.put('/users/me/password', passwordData);
  return data;
};

export const resetUserPassword = async (id) => {
  const { data } = await axiosClient.post(`/users/${id}/reset-password`);
  return data;
};