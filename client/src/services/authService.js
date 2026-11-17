import axiosClient from '../api/Axios';

export const login = async ({ email, password }) => {
  const { data } = await axiosClient.post('/login', { email, password });
  return data;
};

export const register = async (userData) => {
  console.log('Registering user with data:', userData);
  const { data } = await axiosClient.post('/auth/register', userData);
  return data;
};
