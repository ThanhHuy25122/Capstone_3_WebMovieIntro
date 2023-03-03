import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetailApi } from "../../../../services/movie";
import { formatDate } from "../../../../utils";
import "./style.scss"
export default function Detail() {
  const [movieDetail, setMovidetail] = useState({});
  const params = useParams();

  useEffect(() => {
    getMovieDetail();
  }, []);

  const getMovieDetail = async () => {
    const result = await fetchMovieDetailApi(params.movieId);
    setMovidetail(result.data.content);
  };

  return (
    <>
      <div className="col-12">
        <div className="row detail-movie">
          <div className="col-3">
            <img className="w-100" src={movieDetail.hinhAnh} />
          </div>
          <div className="col-9 detail-1">
            <h4>{movieDetail.tenPhim}</h4>
            <p >{movieDetail.moTa}</p>
            <p className="p-time">{formatDate(movieDetail.ngayKhoiChieu)}</p>
            <div>
              <button className="btn btn-outline-dark mr-2 mb-2">TRAILER</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
