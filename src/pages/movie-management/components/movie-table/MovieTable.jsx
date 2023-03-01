import { Modal, notification, Table } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteMovieApi } from "services/movie";
import {
  CloseOutlined,
  EditOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Pagination } from "enums";

export default function MovieTable({
  columns,
  data,
  getMovieList,
  setSearchMovieList,
  current,
  setCurrent,
  totalMovie,
}) {
  const navigate = useNavigate();

  const handleRemove = async (movieId) => {
    try {
      await deleteMovieApi(movieId);
      notification.success({ message: "Delete movie successfully" });
      getMovieList();
      setSearchMovieList([]);
    } catch ({ response }) {
      notification.error({
        message: response.data.content || "Error deleting!",
      });
    }
  };

  const handleConfirmRemove = (movieId) => {
    Modal.confirm({
      title: "Do you want to delete this movie?",
      onOk: () => handleRemove(movieId),
    });
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
        onClick={() => handleConfirmRemove(movieId)}
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

  const onChange = (page) => {
    setCurrent(page);
  };

  const pagination = {
    currentDefault: Pagination.currentDefault,
    current: current,
    pageSize: Pagination.size,
    onChange: (page) => onChange(page),
    pageSizeOptions: ["10"],
    total: totalMovie,
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
      bordered
      rowKey={"key"}
      pagination={pagination}
    />
  );
}
