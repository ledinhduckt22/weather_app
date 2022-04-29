import { fetchReducer } from './fetchReducer'
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  weather: fetchReducer
})