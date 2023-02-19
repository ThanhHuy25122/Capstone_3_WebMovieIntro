import moment from "moment"; // moment format ngày giờ

// folder utils được sử dụng để chứa những cái dùng chung cho cả project

export const formatDate = (date) => {
  return moment(date).format("lll");
};
