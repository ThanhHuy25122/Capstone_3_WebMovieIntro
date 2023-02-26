import { notification } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../services/login";
import { setUserInfoAction } from "../../store/actions/userAction";

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
    <div
      className="w-25 mx-auto py-5"
      style={{
        minHeight: "calc(100vh - 180px)",
      }}
    >
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="">Username</label>
          <input
            onChange={handleChange}
            type="text"
            name="taiKhoan"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="matKhau"
            className="form-control "
          />
        </div>
        <button className="btn btn-primary">LOGIN</button>
      </form>
    </div>
  );
}
