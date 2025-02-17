import axios, { AxiosError, AxiosResponse } from 'axios';

export const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    'Content-Type': 'application/json',
  },
});



export const fetcher = async (axiosPromise :Promise<AxiosResponse>) => {
  try {
    const response = await axiosPromise;
    return { data: response.data, error: null };
  } catch (error) {
    // You can customize error handling here if needed.
    return { data: null, error };
  }
};