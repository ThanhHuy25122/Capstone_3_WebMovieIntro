import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { useMovieList } from "../../../../hooks/useMovieList";
import { useResponsive } from "../../../../hooks/useResposive";

import "./index.scss";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function MovieList() {
  const view = useResponsive();
  const [movieList] = useMovieList();
  const navigate = useNavigate();

  let heightMovieCard = 500;
  if (view.width < 314) {
    heightMovieCard = 200;
  } else if (view.width < 476) {
    heightMovieCard = 300;
  } else if (view.width < 576) {
    heightMovieCard = 350;
  } else if (view.width < 992) {
    heightMovieCard = 400;
  }

  const renderMovieList = () => {
    return movieList.map((ele) => {
      return (
        <div
          key={ele.maPhim}
          // className="col-12 col-md-6 col-lg-4"
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
              <h5 className="card-title name-movie">{ele.tenPhim}</h5>
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
          slidesToShow: 3,
          slidesToScroll: 3,
          rows: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          rows: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          rows: 2,
        },
      },
    ],
  };

  return (
    <div className="container">
      <div id="movieList" className="title">
        <h3>DANH SÁCH PHIM</h3>
      </div>
      <Slider ref={ref} {...settings}>
        {renderMovieList()}
      </Slider>
      <div style={{ textAlign: "center" }}>
        <button className="list-button" onClick={() => previous()}>
          <i className="las la-angle-left"></i>
        </button>
        <button className="list-button" onClick={() => next()}>
          <i className="las la-angle-right"></i>
        </button>
      </div>
    </div>
  );
}
