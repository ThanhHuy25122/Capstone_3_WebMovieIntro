import React, { useState } from "react";
import { useMovieList } from "../../hooks/useMovieList";
import { notification, Table } from "antd";
import { formatDate } from "utils";
import { useNavigate } from "react-router-dom";
import { deleteMovieApi } from "services/movie";
import {
  CloseOutlined,
  EditOutlined,
  FormOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import SearchMovie from "./components/search-movie/SearchMovie";

export default function MovieManagement() {
  const [movieList, getMovieList] = useMovieList();
  const [searchedMovieList, setSearchedMovieList] = useState([]);
  const navigate = useNavigate();

  const handleDeleteMovie = async (maPhim) => {
    try {
      if (window.confirm("Would you like to remove this film?")) {
        await deleteMovieApi(maPhim);

        notification.success({
          message: " Xóa phim thành công",
        });
        getMovieList();
      }
    } catch (error) {
      notification.error({
        message: error.response?.data?.content || error.message,
      });
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
    {
      title: "Actions",
      key: "actions",
      render: (text) => (
        <div style={{ display: "flex" }}>
          <EditOutlined
            title="Edit"
            className="update-icon"
            onClick={() =>
              navigate(`/admin/movie-management/edit/${text.maPhim}`)
            }
          />
          <CloseOutlined
            title="Delete"
            className="remove-icon"
            onClick={() => handleDeleteMovie(text.maPhim)}
          />
          <CalendarOutlined
            title="Add Showtime"
            className="add-icon"
            style={{
              fontSize: "1.3rem",
            }}
            onClick={() =>
              navigate(
                `/admin/movie-management/showtime-management/add/${text.maPhim}`
              )
            }
          />
        </div>
      ),
    },
  ];

  const handleSearchMovie = (value) => {
    const filteredMovies = movieList.filter((movie) =>
      movie.tenPhim.toLowerCase().includes(value.toLowerCase())
    );
    if (filteredMovies.length <= 0) {
      notification.info("No search results");
    }
    setSearchedMovieList(filteredMovies);
  };

  return (
    <div>
      <FormOutlined
        title="Add Movie"
        className="add-icon"
        onClick={() => navigate("/admin/movie-management/add")}
        type="primary"
        style={{
          marginBottom: "0.6rem",
        }}
      />
      <SearchMovie movieList={movieList} />
      <Table columns={columns} dataSource={movieList} />
    </div>
  );
}
