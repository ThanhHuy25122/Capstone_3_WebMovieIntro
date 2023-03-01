import React from "react";
import Detail from "./components/detail/Detail";
import Showtimes from "./components/showtimes/Showtimes";

export default function MovieDetail() {
  return (
    <>
      <div
        className="my-5"
        style={{
          minHeight: "calc(100vh - 180px)",
        }}
      >
        <div>
          <div className="title my-5">
            <h3>Chi tiết phim</h3>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <Detail />
            <Showtimes />
          </div>
        </div>
      </div>
    </>
  );
}
