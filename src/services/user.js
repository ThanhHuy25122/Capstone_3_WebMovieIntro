import { axiosRequest } from "configs/axios.config";
import { GROUP_ID } from "../constants";

export const fetchUserListApi = () => {
  return axiosRequest({
    url: `/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP_ID}`,
    method: "GET",
  });
};

export const createUserApi = (information) => {
  return axiosRequest({
    url: `QuanLyNguoiDung/ThemNguoiDung`,
    method: "POST",
    data: information,
  });
};

export const removeUserApi = (username) => {
  return axiosRequest({
    url: `/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${username}`,
    method: "DELETE",
  });
};
