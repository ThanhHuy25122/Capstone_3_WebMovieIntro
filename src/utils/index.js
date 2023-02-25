import moment from "moment"; // moment format ngày giờ
import "moment/locale/vi";
// folder utils được sử dụng để chứa những cái dùng chung cho cả project

export const formatDate = (date) => {
  return moment(date).locale("vi").format("lll");
};
