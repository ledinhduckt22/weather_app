import { FETCH_WEATHER } from "../actionTypes";

const initialState = {
  weather: {},
};

export const fetchReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_WEATHER:
      return {
        ...state,
        weather: action.payload,
      };
    default:
      return state;
  }
}