import { axiosRequest } from "../configs/axios.config";

export const fetchMovieShowtimesApi = (movieId) => {
  return axiosRequest({
    url: `/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${movieId}`,
    method: "GET",
  });
};

export const fetchCinemasApi = () => {
  return axiosRequest({
    url: `/QuanLyRap/LayThongTinHeThongRap`,
    method: "GET",
  });
};

export const fetchCinemaLocationsApi = (cinemaID) => {
  return axiosRequest({
    url: `/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${cinemaID}`,
    method: "GET",
  });
};
