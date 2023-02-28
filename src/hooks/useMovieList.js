/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Modal } from "antd";
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
    } catch ({ response }) {
      Modal.error({
        title: response.data.content || "Lỗi khi lấy dữ liệu",
      });
    }

    setTimeout(() => {
      setLoadingState({ isLoading: false });
    }, 900);
  };
  return [movieList, getMovieList];
};
