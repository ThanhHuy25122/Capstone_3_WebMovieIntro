import { axiosRequest } from "configs/axios.config";
import { GROUP_ID } from "constants";

export const fetchUserListApi = () => {
  return axiosRequest({
    url: `/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${"GP00"}`,
    method: "GET",
  });
};

export const removeUserApi = (username) => {
  return axiosRequest({
    url: `/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${username}`,
    method: "DELETE",
  });
};
