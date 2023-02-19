import React from "react";
import Detail from "./components/detail/Detail";
import Showtimes from "./components/showtimes/Showtimes";

export default function MovieDetail() {
  return (
    <>
      <div
        className="py-5"
        style={{
          minHeight: "calc(100vh - 180px)",
        }}
      >
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
