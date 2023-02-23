import {
  GET_CINEMA_LIST,
  GET_CINEMA_LOCATION_LIST,
} from "store/types/cinemaType";

const DEFAULT_STORE = {
  cinemaList: [],
  cinemaLocationList: [],
};

export const cinemaReducer = (state = DEFAULT_STORE, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_CINEMA_LIST: {
      state.cinemaList = payload;
      break;
    }
    case GET_CINEMA_LOCATION_LIST: {
      state.cinemaLocationList = [...state.cinemaLocationList, ...payload];
      break;
    }

    default:
      break;
  }
  return { ...state };
};
