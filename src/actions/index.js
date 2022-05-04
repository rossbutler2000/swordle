import {
  LETTER_NUM,
  ROW,
  TODAYS_WORD
} from "../data/types";
import { randomWords } from "../data/randomizedList";
import "../data/initialState";

export * from "./change";
export * from "./error";
export * from "./keyboardActions";
export * from "./set";
export * from "./show";
export * from "./solver";


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





