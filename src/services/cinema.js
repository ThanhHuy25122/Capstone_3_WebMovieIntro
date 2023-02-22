import { axiosRequest } from "../configs/axios.config";

export const fetchMovieShowtimesApi = (movieId) => {
  return axiosRequest({
    url: `/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${movieId}`,
    method: "GET",
  });
};

export const fetchCinamesApi = () => {
  return axiosRequest({
    url: `/QuanLyRap/LayThongTinHeThongRap`,
    method: "GET",
  });
};

export const fetchCinemaLocationApi = (cinameId) => {
  return axiosRequest({
    url: `/QuanLyRap/LayThongTinCumRapTheoHeThong?
    maHeThongRap=${cinameId}`,
    method: "GET",
  });
};
