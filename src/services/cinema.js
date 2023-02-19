import { axiosRequest } from "../configs/axios.config";

export const fetchMovieShowtimesApi = (movieId) => {
  return axiosRequest({
    url: `/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${movieId}`,
    method: "GET",
  });
};
