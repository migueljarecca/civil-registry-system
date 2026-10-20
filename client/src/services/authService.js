import axiosClient from "../api/Axios";


export const login = async (email, password) => {
  const { data } = await axiosClient.post('/login', { email, password });
  return data;
};