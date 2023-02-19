import { useEffect, useState } from "react";
import { fetchMovieListApi } from "../services/movie";

export const useMovieList = () => {
  const [movieList, setMovieList] = useState([]);
  useEffect(() => {
    getMovieList();
  }, []);

  const getMovieList = async () => {
    const result = await fetchMovieListApi();
    setMovieList(result.data.content);
  };
  return movieList;
};
