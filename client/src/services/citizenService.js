import axiosClient from '../api/Axios';

export const getAllCitizens = async () => {
  const { data } = await axiosClient.get('/citizens');
  return data;
};

export const getCitizenById = async (id) => {
  const { data } = await axiosClient.get(`/citizens/${id}`);
  return data;
};

export const createCitizen = async (citizenData) => {
  const { data } = await axiosClient.post('/citizens', citizenData);
  return data;
};

export const updateCitizen = async (id, citizenData) => {
  const { data } = await axiosClient.put(`/citizens/${id}`, citizenData);
  return data;
};

export const deleteCitizen = async (id) => {
  const { data } = await axiosClient.delete(`/citizens/${id}`);
  return data;
};
