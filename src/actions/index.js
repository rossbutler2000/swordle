import {
  ERROR_MESSAGE,
  FAIL,
  FINISHED,
  LETTER_NUM,
  ROW,
  ROW_SHAKE,
  TODAYS_WORD
} from "../data/types";
import "../data/initialState";
import { randomWords } from "../data/randomizedList";

export * from "./change";
export * from "./set";
export * from "./show";
export * from "./solver";



export const finish = () => {
  return { type: FINISHED, payload: true };
}

export const firstLetter = () => {
  return { type: LETTER_NUM, payload: 0 };
}

export const nextRow = () => (dispatch, getState) => {
  const { row } = getState();

  dispatch({ type: ROW, payload: row + 1 })
}

export const selectTodaysWord = (number) => {
  return { type: TODAYS_WORD, payload: randomWords[number].toUpperCase() };
}

export const shakeRow = (errorMessage = '') => (dispatch, getState) => {
  const { row, rowShake } = getState();

  const newShake = [...rowShake];
  newShake[row] = !newShake[row];

  dispatch({ type: ERROR_MESSAGE, payload: errorMessage });
  dispatch({ type: ROW_SHAKE, payload: newShake });

  setTimeout(() => {
    dispatch({ type: ERROR_MESSAGE, payload: '' })
  }, 1500);
}



