import axios, { AxiosResponse } from 'axios';
import { MovieDetails } from './types';

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


export const fetchMovieDetails  = async (movieId : number) :  Promise<MovieDetails>  => {
  const { data, error } = await fetcher(api.get(`/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&append_to_response=videos`));
  if (error) {
    throw error;
  }
  //testing loading
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return data;
}


export interface MovieResponse {
    page: number;
    total_pages: number;
    results: MovieDetails[];
}

export const fetchMoviesWithPage = async (page: number) : Promise<MovieResponse> => {
  const { data, error } = await fetcher(api.get(`/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&page=${page}`));
  if (error) {
    throw error;
  }
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return data;
}