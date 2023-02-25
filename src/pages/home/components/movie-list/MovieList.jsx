import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { useMovieList } from "../../../../hooks/useMovieList";
import { useResponsive } from "../../../../hooks/useResposive";
import { Tabs } from "antd";
import "./index.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function MovieList() {
  const view = useResponsive();
  const [movieList] = useMovieList();
  const navigate = useNavigate();

  let heightMovieCard = 500;
  if (view.width < 768) {
    heightMovieCard = 550;
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
    console.log("hehe");
  };

  const previous = () => {
    ref.current.slickPrev();
    console.log("hii");
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
          slidesToShow: 2,
          slidesToScroll: 2,
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

      <header>
        <Tabs>
          <Tabs.TabPane tab="Phim sắp chiếu" key="tab1">
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
          </Tabs.TabPane>
          <Tabs.TabPane tab="Phim Sex Châu phi" key="tab2">
            <div> This is ..cl.</div>
          </Tabs.TabPane>
        </Tabs>
      </header>

      {/* <div className="row mt-3 mx-auto pl-3 pr-3">
       
      </div> */}
    </div>
  );
}
