import { notification } from "antd";
import { useResponsive } from "hooks/useResposive";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMovieList } from "../../../../hooks/useMovieList";
import "./index.scss";

export default function MovieList() {
  const [movieList] = useMovieList();
  const navigate = useNavigate();
  const [items, setItems] = useState(6);

  const renderMovieList = () => {
    return movieList.slice(0, items).map((ele) => {
      return (
        <div
          key={ele.maPhim}
          className="col-12 col-md-6 col-lg-4"
          onClick={() => navigate(`/movie-detail/${ele.maPhim}`)}
        >
          <div
            className="card movie-card"
            style={{
              marginBottom: 20,
              height: 500,
              overflow: "hidden",
            }}
          >
            <img
              style={{
                objectFit: "cover",
                minHeight: 500 - 2,
                position: "relative",
                borderRadius: "0.25rem",
              }}
              className="card-img-top"
              src={ele.hinhAnh}
              alt="movie"
            />
            <div className="card-body">
              <h5 className="card-title">{ele.tenPhim}</h5>
            </div>
          </div>
        </div>
      );
    });
  };

  const handleReadMore = () => {
    if (movieList.length < items) {
      notification.warning({
        message: "Không còn phim trong danh sách !",
      });
      return;
    }
    setItems(items + 5);
  };

  return (
    <div>
      <div className="title">
        <h3>Danh Sách Phim</h3>
      </div>
      <div className="row mt-3 mx-auto pl-3 pr-3">{renderMovieList()}</div>
      <div
        style={{
          textAlign: "center",
        }}
      >
        <button onClick={handleReadMore} className="btn btn-primary">
          Xem thêm
        </button>
      </div>
    </div>
  );
}
