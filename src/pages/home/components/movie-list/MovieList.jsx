import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMovieList } from "../../../../hooks/useMovieList";

export default function MovieList() {
  const [movieList] = useMovieList();
  const navigate = useNavigate();

  const renderMovieList = () => {
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

  const ref = useRef({});

  const next = () => {
    ref.current.slickNext();
  };

  const previous = () => {
    ref.current.slickPrev();
  };
  const settings = {
    className: "section-outstanding__slider",
    slidesToShow: 4,
    slidesToScroll: 4,
    infinite: false,
    rows: 2,
    accessibility: true,
    adaptiveHeight: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          rows: 2,
          adaptiveHeight: false,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          rows: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 1,
        },
      },
    ],
  };
  return (
    <div>
      <div id="movieList" className="title">
        <h3>Danh Sách Phim</h3>
      </div>

      <div className="row mt-3 mx-auto pl-3 pr-3">{renderMovieList()}</div>
    </div>
  );
}
