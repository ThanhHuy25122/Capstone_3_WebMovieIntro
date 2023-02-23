import {
  GET_CINEMA_LIST,
  GET_CINEMA_LOCATION_LIST,
} from "store/types/cinemaType";

export const getCinemaListAction = (data) => {
  return {
    type: GET_CINEMA_LIST,
    payload: data,
  };
};

export const getCinemaLocationListAction = (data) => {
  return {
    type: GET_CINEMA_LOCATION_LIST,
    payload: data,
  };
};
