import { LoadingContext } from "contexts/loading/LoadingContext";
import { useContext, useEffect, useState } from "react";
import { fetchMovieListApi } from "../services/movie";

export const useMovieList = () => {
  const [movieList, setMovieList] = useState([]);
  const [_, setLoadingState] = useContext(LoadingContext);

  useEffect(() => {
    getMovieList();
  }, []);

  const getMovieList = async () => {
    setLoadingState({ isLoading: true });
    try {
      const result = await fetchMovieListApi();
      setMovieList(
        result.data.content.map((user, idx) => {
          return { ...user, key: idx };
        })
      );
    } catch (error) {
      console.error(error);
    }

    setTimeout(() => {
      setLoadingState({ isLoading: false });
    }, 2000);
  };
  return [movieList, getMovieList];
};
