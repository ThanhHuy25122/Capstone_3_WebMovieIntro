import { notification, Table } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteMovieApi } from "services/movie";
import {
  CloseOutlined,
  EditOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

export default function MovieTable({
  columns,
  data,
  getMovieList,
  setSearchMovieList,
}) {
  const navigate = useNavigate();
  const handleDelete = async (movieId) => {
    try {
      if (window.confirm("Would you like to remove this film?")) {
        await deleteMovieApi(movieId);

        notification.success({
          message: " Xóa phim thành công",
        });
        getMovieList();
        setSearchMovieList([]);
      }
    } catch (error) {
      notification.error({
        message: error.response?.data?.content || error.message,
      });
    }
  };

  const renderActions = (movieId) => {
    const actions = [
      <EditOutlined
        key="edit"
        title="Edit"
        className="update-icon"
        onClick={() => navigate(`/admin/movie-management/edit/${movieId}`)}
      />,
      <CloseOutlined
        key="delete"
        title="Delete"
        className="remove-icon"
        onClick={() => handleDelete(movieId)}
      />,
      <CalendarOutlined
        key="addShowtime"
        title="Add Showtime"
        className="add-icon"
        style={{
          fontSize: "1.3rem",
        }}
        onClick={() => navigate(`/admin/showtime-management/add/${movieId}`)}
      />,
    ];
    return actions;
  };
  return (
    <Table
      columns={[
        ...columns,
        {
          title: "Actions",
          key: "actions",
          render: (record) => (
            <div style={{ display: "flex" }}>
              {renderActions(record.maPhim)}
            </div>
          ),
        },
      ]}
      dataSource={data}
    />
  );
}
