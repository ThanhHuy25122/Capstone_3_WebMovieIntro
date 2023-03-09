/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { useMovieList } from "../../hooks/useMovieList";
import { notification } from "antd";
import { formatDate } from "utils";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FormOutlined } from "@ant-design/icons";
import SearchMovie from "./components/search-movie/SearchMovie";
import MovieTable from "./components/movie-table/MovieTable";
import { LoadingContext } from "contexts/loading/LoadingContext";
import { fetchSearchMovieApi } from "services/movie";

export default function MovieManagement() {
  const [movieList, getMovieList] = useMovieList();
  const [searchMovieList, setSearchMovieList] = useState([]);
  const navigate = useNavigate();
  const [_, setSearchParams] = useSearchParams({
    search: "",
    page: 1,
  });
  const [totalMovie, setTotalMovie] = useState();
  const [current, setCurrent] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [__, setLoadingState] = useContext(LoadingContext);

  useEffect(() => {
    handleSearchQuery();
  }, [current]);

  useEffect(() => {
    setCurrent(1);
    handleSearchQuery();
    setSearchParams({
      search: keyword === "" ? "all" : keyword,
      page: 1,
    });
  }, [keyword]);

  const handleSearchQuery = async () => {
    setLoadingState({ isLoading: true });
    try {
      const result = await fetchSearchMovieApi(keyword, current);
      setSearchParams({
        search: keyword === "" ? "all" : keyword,
        page: current,
      });
      const { totalCount, items, count } = result.data.content;
      if (items.length > 0) {
        setSearchMovieList(
          items.map((ele, idx) => {
            return {
              ...ele,
              key: idx,
            };
          })
        );
        setTotalMovie(totalCount);
      }
      if (count === 0) {
        notification.warning({
          message:
            "Không có tài khoản bạn tìm kiếm : " + decodeURIComponent(keyword),
        });
        return;
      }
    } catch ({ response }) {
      notification.error({
        message: response?.data?.content || "Lỗi khi lấy dữ liệu !",
      });
    } finally {
      setTimeout(() => setLoadingState({ isLoading: false }), 500);
    }
  };

  const columns = [
    {
      title: "Movie Name",
      dataIndex: "tenPhim",
      key: "tenPhim",
    },
    {
      title: "Showtime",
      dataIndex: "ngayKhoiChieu",
      key: "ngayKhoiChieu",
      render: (text) => formatDate(text),
    },
    {
      title: "Description",
      dataIndex: "moTa",
      key: "moTa",
    },
    {
      title: "Vote",
      dataIndex: "danhGia",
      key: "danhGia",
    },
  ];

  const data = searchMovieList.length > 0 ? searchMovieList : movieList;

  return (
    <div>
      <FormOutlined
        title="Add Movie"
        className="add-icon"
        onClick={() => navigate("/admin/movie-management/add")}
        type="primary"
      />
      <p />
      <SearchMovie setKeyword={setKeyword} />
      <p />
      <MovieTable
        columns={columns}
        data={data}
        getMovieList={getMovieList}
        setSearchMovieList={setSearchMovieList}
        current={current}
        totalMovie={totalMovie}
        setCurrent={setCurrent}
      />
    </div>
  );
}
