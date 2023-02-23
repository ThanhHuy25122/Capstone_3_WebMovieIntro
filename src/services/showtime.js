import { axiosRequest } from "configs/axios.config";

export const addMovieShowtimeApi = (information) => {
  return axiosRequest({
    url: `/QuanLyDatVe/TaoLichChieu`,
    method: "POST",
    data: information,
  });
};
