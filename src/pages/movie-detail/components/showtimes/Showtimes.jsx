import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchMovieShowtimesApi } from "../../../../services/cinema";
import { formatDate } from "../../../../utils";
import "./style.scss";
export default function Showtimes() {
  const [movieShowtimes, setMovieShowtimes] = useState();

  const params = useParams({});
  useEffect(() => {
    fetchMovieShowtimes();
  }, []);

  const fetchMovieShowtimes = async () => {
    const result = await fetchMovieShowtimesApi(params.movieId);
    setMovieShowtimes(result.data.content);
  };

  const renderTabs = () => {
    return movieShowtimes?.heThongRapChieu?.map((ele, idx) => {
      return (
        <a
          key={ele.maHeThongRap}
          className={`nav-link time-showtime text-capitalize ${
            !idx && "active"
          }`}
          data-toggle="pill"
          href={`#${ele.maHeThongRap}`}
          role="tab"
          aria-selected="true"
        >
          {ele.tenHeThongRap}
        </a>
      );
    });
  };

  const renderTabContent = () => {
    return movieShowtimes?.heThongRapChieu?.map((element, idx) => {
      return (
        <div
          key={element.maHeThongRap}
          className={`tab-pane fade show ${!idx && "active"}`}
          id={element.maHeThongRap}
          role="tabpanel"
        >
          {element?.cumRapChieu?.map((ele) => {
            return (
              <div key={ele.maCumRap} className="row mb-5">
                <div className="row col-12 bg-dark">
                  <div
                    className="col-1"
                    style={{
                      lineHeight: "56px",
                    }}
                  >
                    <img
                      className="img-fluid rounded"
                      style={{}}
                      src={element.logo}
                      alt=""
                    />
                  </div>
                  <div className="col-11 pl-0">
                    <h5>{ele.tenCumRap}</h5>
                    <span className="text-muted">{ele.diaChi}</span>
                  </div>
                </div>
                <div className="col-12">
                  <div className="row">
                    {ele?.lichChieuPhim.map((e) => {
                      return (
                        <div key={e.maLichChieu} className="col-3 ">
                          <Link
                            className="time-showtime"
                            to={`/booking/${e?.maLichChieu}`}
                          >
                            {formatDate(e.ngayChieuGioChieu)}
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    });
  };

  return (
    <>
      <div className="col-12 mt-5 text-light">
        <div className="row">
          <div className="col-12 col-sm-3">
            <div
              className="nav flex-column nav-pills "
              id="v-pills-tab"
              role="tablist"
              aria-orientation="vertical"
            >
              {renderTabs()}
            </div>
          </div>
          <div
            className="col-12 col-sm-9"
            style={{
              overflow: "hidden",
            }}
          >
            <div className="tab-content" id="v-pills-tabContent">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
