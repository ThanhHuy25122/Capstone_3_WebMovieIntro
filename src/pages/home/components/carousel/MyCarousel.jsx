import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import { fetchMovieCarouselListApi } from "../../../../services/movie";
import { NavLink } from "react-router-dom";
import { useResponsive } from "../../../../hooks/useResposive";

export default function MyCarousel() {
  const [carouselList, setCarouselList] = useState([]);
  const view = useResponsive();

  let heightCarousel = "600px";
  if (view.width < 992) {
    heightCarousel = "400px";
  } else if (view.width > 1440) {
    heightCarousel = "800px";
  }

  const contentStyle = {
    width: "100%",

    color: "#fff",
    textAlign: "center",
    background: "transparent",
    display: "flex",
    justifyContent: "center",
  };

  const imgCarousel = {
    height: heightCarousel,
    objectFit: "cover",
    width: "100%",
  };

  useEffect(() => {
    fetchMovieCarousel();
  }, []);

  const fetchMovieCarousel = async () => {
    const result = await fetchMovieCarouselListApi();
    setCarouselList(result.data.content);
  };
  const renderCarousel = () => {
    return carouselList.map((ele) => {
      return (
        <NavLink key={ele.maBanner} to={`/movie-detail/${ele.maPhim}`}>
          <div className="card-img" style={contentStyle}>
            <img style={imgCarousel} src={ele.hinhAnh} alt="" />
          </div>
        </NavLink>
      );
    });
  };
  return (
    <>
      <Carousel autoplay>{renderCarousel()}</Carousel>
    </>
  );
}
