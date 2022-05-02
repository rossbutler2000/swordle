import { EXPIRY_DATE, SCORE } from "../data/types";


export const setExpiryDate = (date) => {
  return { type: EXPIRY_DATE, payload: date };
}

export const setScore = (score) => (dispatch) => {
  dispatch({ type: SCORE, payload: score });
}