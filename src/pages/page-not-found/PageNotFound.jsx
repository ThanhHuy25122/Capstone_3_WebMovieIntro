import React from "react";
import { NavLink } from "react-router-dom";
import { DoubleLeftOutlined } from "@ant-design/icons";

export default function PageNotFound() {
  return (
    <article
      style={{
        color: "white",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <header
        style={{
          width: "50vw",
          height: "50vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h3
          style={{
            fontSize: "8rem",
          }}
        >
          {" "}
          404
        </h3>
        <p
          style={{
            fontSize: "1.2rem",
          }}
        >
          {" "}
          Không có đường dẫn. Hoặc bạn không có quyền truy cập vào đường đẫn.
          Vui lòng quay lại trang chủ.
        </p>
        <NavLink
          className="btn btn-light"
          style={{
            display: "inline-flex",
            alignItems: "center",
          }}
          to="/"
        >
          <DoubleLeftOutlined /> Trang chủ
        </NavLink>
      </header>
    </article>
  );
}
