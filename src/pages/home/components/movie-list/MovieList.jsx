import React from "react";
import { useNavigate } from "react-router-dom";

import { useMovieList } from "../../../../hooks/useMovieList";
import { useResponsive } from "../../../../hooks/useResposive";
import "./index.scss";

export default function MovieList() {
  const view = useResponsive();
  const movieList = useMovieList();
  const navigate = useNavigate();

  let heightMovieCard = 500;
  if (view.width < 768) {
    heightMovieCard = 550;
  }

  const renderMovieList = () => {
    console.log(movieList);
    return movieList.map((ele) => {
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
              height: heightMovieCard,
              overflow: "hidden",
            }}
          >
            <img
              style={{
                objectFit: "cover",
                minHeight: heightMovieCard - 2,
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

  return (
    <div>
      <div className="title">
        <h3>Danh Sách Phim</h3>
      </div>
      <div className="row mt-3 mx-auto pl-3 pr-3">{renderMovieList()}</div>
    </div>
  );
}
