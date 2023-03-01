import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetailApi } from "../../../../services/movie";
import { formatDate } from "../../../../utils";

export default function Detail() {
  const [movieDetail, setMovieDetail] = useState({});
  const [videoSrc, setVideoSrc] = useState(
    "https://www.youtube.com/watch?v=TADeD68Wo5c"
  );

  const params = useParams();

  useEffect(() => {
    getMovieDetail();
  }, []);
  const handleVideoError = () => {
    // Nếu xảy ra lỗi, thay đổi source của video sang đường dẫn mới
    setVideoSrc("https://www.youtube.com/watch?v=TADeD68Wo5c");
  };

  const getMovieDetail = async () => {
    const result = await fetchMovieDetailApi(params.movieId);
    setMovieDetail(result.data.content);
    setVideoSrc(result.data.content.trailer);
  };

  return (
    <>
      <div className="col-12">
        <div className="row">
          <div className="col-3">
            <img
              style={{
                border: "1px solid white",
                borderRadius: "0.3rem",
                maxHeight: 400,
              }}
              className="w-100"
              src={movieDetail.hinhAnh}
              alt=""
            />
          </div>
          <div
            className="col-9"
            style={{
              color: "white",
            }}
          >
            <div
              style={{
                minHeight: 400,
              }}
            >
              <h4>{movieDetail.tenPhim}</h4>
              <p>{movieDetail.moTa}</p>
              <p>{formatDate(movieDetail.ngayKhoiChieu)}</p>
            </div>

            <iframe
              width={560}
              height={315}
              src={videoSrc}
              title="YouTube video player"
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              onError={handleVideoError}
            />
          </div>
        </div>
      </div>
    </>
  );
}
