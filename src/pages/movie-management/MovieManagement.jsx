import React from "react";
import { useMovieList } from "../../hooks/useMovieList";
import { notification, Table } from "antd";
import { formatDate } from "utils";
import { useNavigate } from "react-router-dom";
import { deleteMovieApi } from "services/movie";
import { CloseOutlined, EditOutlined, FormOutlined } from "@ant-design/icons";

export default function MovieManagement() {
  const [movieList, getMovieList] = useMovieList();
  const navigate = useNavigate();

  const handleDeleteMovie = async (maPhim) => {
    try {
      if (window.confirm("Would you like to remove this flim?")) {
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
            className="update-icon"
            onClick={() =>
              navigate(`/admin/movie-management/edit/${text.maPhim}`)
            }
          />
          <CloseOutlined
            className="remove-icon"
            onClick={() => handleDeleteMovie(text.maPhim)}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <FormOutlined
        className="add-icon"
        onClick={() => navigate("/admin/movie-management/add")}
        type="primary"
      />
      <Table columns={columns} dataSource={movieList} />
    </div>
  );
}
