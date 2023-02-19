import { axiosRequest } from "../configs/axios.config";

export const fetchTicketDetailApi = (showtimeId) => {
  return axiosRequest({
    url: `QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${showtimeId}`,
    method: "GET",
  });
};

export const bookTicketApi = (data) => {
  return axiosRequest({
    url: `/QuanLyDatVe/DatVe`,
    method: "POST",
    data: data,
  });
};
