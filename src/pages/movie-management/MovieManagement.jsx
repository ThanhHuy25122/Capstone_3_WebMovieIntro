import React, { useState } from "react";
import { useMovieList } from "../../hooks/useMovieList";
import { notification } from "antd";
import { formatDate } from "utils";
import { useNavigate } from "react-router-dom";
import { FormOutlined } from "@ant-design/icons";
import SearchMovie from "./components/search-movie/SearchMovie";
import MovieTable from "./components/movie-table/MovieTable";

export default function MovieManagement() {
  const [movieList, getMovieList] = useMovieList();
  const [searchMovieList, setSearchMovieList] = useState([]);
  const navigate = useNavigate();

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

  const handleSearch = (value) => {
    const filteredMovies = movieList.filter((movie) =>
      movie.tenPhim.toLowerCase().includes(value.toLowerCase())
    );
    if (filteredMovies.length <= 0) {
      notification.info("No search results");
    }
    setSearchMovieList(filteredMovies);
  };

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
      <SearchMovie onSearch={handleSearch} />
      <p />
      <MovieTable
        columns={columns}
        data={data}
        getMovieList={getMovieList}
        setSearchMovieList={setSearchMovieList}
      />
    </div>
  );
}
