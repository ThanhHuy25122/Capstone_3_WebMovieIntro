import { axiosRequest } from "../configs/axios.config";

export const addUserApi = (information) => {
  return axiosRequest({
    url: `/QuanLyNguoiDung/DangKy`,
    method: "POST",
    data: information,
  });
};

export const fetchUserAccountApi = () => {
  return axiosRequest({
    url: `/QuanLyNguoiDung/ThongTinTaiKhoan`,
    method: "POST",
  });
};
export const updateUserApi = (information) => {
  return axiosRequest({
    url: `/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
    method: "PUT",
    data: information,
  });
};
