import { notification } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { loginApi } from "../../services/login";
import { setUserInfoAction } from "../../store/actions/userAction";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    taiKhoan: "",
    matKhau: "",
  });

  const labelLogin = {
    fontSize: "1.5rem",
    margin: "1rem auto",
  };

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
          height: "calc(50vw - 15vh)",
          width: "50vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(255, 255, 255,0.2",
          borderRadius: "10px",
          position: "relative",
        }}
      >
        <NavLink
          className="btn btn-secondary"
          style={{
            position: "absolute",
            zIndex: "2",
            top: "15px",
            left: "15px",
            fontSize: "13px",
          }}
          to="/"
        >
          Trở về trang chủ
        </NavLink>
        <NavLink
          className="btn btn-warning"
          style={{
            position: "absolute",
            zIndex: "2",
            top: "15px",
            right: "15px",
            fontSize: "13px",
          }}
          to="/register"
        >
          Đăng ký
        </NavLink>
        <div
          className="w-50 py-5"
          style={{
            color: "white",
          }}
        >
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label style={labelLogin} htmlFor="">
                Tài khoản
              </label>
              <input
                onChange={handleChange}
                type="text"
                name="taiKhoan"
                className="form-control border-secondary"
                placeholder="Nhập tài khoản ..."
              />
            </div>
            <div className="form-group">
              <label style={labelLogin} htmlFor="">
                Mật khẩu
              </label>
              <input
                onChange={handleChange}
                type="password"
                name="matKhau"
                className="form-control border-secondary"
                placeholder="Nhập mật khẩu ..."
              />
            </div>
            <button className="btn btn-primary">LOGIN</button>
          </form>
        </div>
      </header>
    </article>
  );
}
