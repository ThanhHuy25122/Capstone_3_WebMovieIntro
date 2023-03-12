import { notification } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { loginApi } from "../../services/login";
import { setUserInfoAction } from "../../store/actions/userAction";

import "./style.scss";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    taiKhoan: "",
    matKhau: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await loginApi(state);
      localStorage.setItem(
        "USER_INFO_KEY",
        JSON.stringify(result.data.content)
      );
      dispatch(setUserInfoAction(result.data.content));
      navigate("/");
    } catch ({ response }) {
      notification.error({
        message: response?.data?.content || "Đăng nhập không thành công !",
      });
    }
  };

  return (
    <article
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <header
        style={{
          padding: "16px 0",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          borderRadius: "10px",
          position: "absolute",
          width: "100vw",
          maxWidth: 500,
          zIndex: 2,
        }}
      >
        <h1
          className="text-dark"
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            padding: "12px 0",
            textTransform: "uppercase",
          }}
        >
          Đăng nhập
        </h1>
        <div
          className="w-75"
          style={{
            color: "white",
          }}
        >
          <form onSubmit={handleSubmit} method="post">
            <div className="txt_field">
              <input
                onChange={handleChange}
                name="taiKhoan"
                type="text"
                required
              />
              <span />
              <label>Tài khoản</label>
            </div>
            <div className="txt_field">
              <input
                onChange={handleChange}
                name="matKhau"
                type="password"
                required
              />
              <span />
              <label>Mật khẩu</label>
            </div>
            <input type="submit" value="Đăng nhập" />
            <div className="signup_link">
              <NavLink to="/">Trang chủ</NavLink> ! Bạn không phải là thành
              viên? <NavLink to="/register">Đăng ký</NavLink>
            </div>
          </form>
        </div>
      </header>
    </article>
  );
}
