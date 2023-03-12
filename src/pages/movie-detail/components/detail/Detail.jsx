import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetailApi } from "../../../../services/movie";
import { formatDate } from "../../../../utils";
import "./style.scss";
export default function Detail() {
  const [movieDetail, setMovieDetail] = useState({});

  const params = useParams();

  useEffect(() => {
    getMovieDetail();
  }, []);

  const getMovieDetail = async () => {
    const result = await fetchMovieDetailApi(params.movieId);
    setMovieDetail(result.data.content);
  };

  return (
    <div className="col-12">
      <div className="col-12 ">
        <div className="row ">
          <div className="col-12 col-sm-9 col-lg-4 img-detail">
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
                  minWidth: "100%",
                  position: "relative",
                  borderRadius: "0.25rem",
                }}
                className="card-img-top"
                src={movieDetail.hinhAnh}
                alt="movie"
              />
            </div>
          </div>
          <div
            className="col-12 col-sm-9 col-lg-8 name-detail"
            style={{
              color: "white",
            }}
          >
            <div>
              <h3>{movieDetail.tenPhim}</h3>
              <h5>Mô tả :</h5>
              <p
                style={{
                  padding: "20px",
                }}
              >
                {movieDetail.moTa}
              </p>
              <h5> Ngày chiếu dự kiến : </h5>
              <p
                style={{
                  padding: "20px",
                }}
              >
                {formatDate(movieDetail.ngayKhoiChieu)}
              </p>
            </div>

            <div className="title">
              <h3>Trailer</h3>
            </div>
            <div
              className="trailer"
              style={{
                height: `calc(560px * 9 / 16)`,
                textAlign: "center",
                backgroundColor: "rgba(255, 255, 255, .7)",
                marginTop: 20,
              }}
            >
              <p
                style={{
                  color: "black",
                }}
              >
                Trailer đang phát triển
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
