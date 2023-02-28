import { axiosRequest } from "configs/axios.config";
import { Pagination } from "enums";
import { GROUP_ID } from "../constants";

export const fetchUserListApi = () => {
  return axiosRequest({
    url: `/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP_ID}`,
    method: "GET",
  });
};

export const fetchUserApi = (username) => {
  return axiosRequest({
    url: `/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${username}`,
    method: "POST",
  });
};

export const fetchSearchUserApi = (keyword, currentPage) => {
  return axiosRequest({
    url: `/QuanLyNguoiDung/TimKiemNguoiDungPhanTrang?MaNhom=${GROUP_ID}${
      keyword === "" ? "" : `&tuKhoa=${keyword}`
    }${currentPage ? `&soTrang=${currentPage}` : ""}&soPhanTuTrenTrang=${
      Pagination.size
    }`,
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
