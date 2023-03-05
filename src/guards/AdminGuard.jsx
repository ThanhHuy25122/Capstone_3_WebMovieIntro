import { notification } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { MaLoaiNguoiDung } from "../enums";

export default function AdminGuard() {
  const userState = useSelector((state) => state.userReducer);
  const navigate = useNavigate();

  useEffect(() => {
    // ng dùng chưa đăng nhập
    if (!userState.userInfo) {
      notification.warning({
        message: "Chưa đăng nhập chưa thể truy cập !",
      });
      navigate("/");
    } else {
      //ng dùng đã đăng nhập nhưng maLoaiNguoiDung = Khach Hang
      if (userState.userInfo.maLoaiNguoiDung === MaLoaiNguoiDung.KhachHang) {
        notification.warning({
          message: "Khách hàng không có quyển truy cập !",
        });
        navigate("/");
      }
      if (userState.userInfo.maLoaiNguoiDung === MaLoaiNguoiDung.QuanTri) {
        notification.success({
          message: "Vào thành công trang quản lý !",
        });
        navigate("/admin/movie-management");
      }
    }
  }, []);

  return <Outlet />;
}
