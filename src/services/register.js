import { axiosRequest } from "../configs/axios.config";

export const addUserApi = (information) => {
  return axiosRequest({
    url: `/QuanLyNguoiDung/DangKy`,
    method: "POST",
    data: information,
  });
};
