import { GUESSES, KEYBOARD, LETTER_NUM, ROW, SCORE } from "../data/types";


export const changeGuesses = (guesses) => (dispatch) => {
  dispatch({ type: GUESSES, payload: guesses });
}

export const changeKeyboard = (keyboard) => (dispatch) => {
  dispatch({ type: KEYBOARD, payload: keyboard });
}

export const changeLetterNum = (number) => (dispatch) => {
  dispatch({ type: LETTER_NUM, payload: number });
}

export const changeScore = (pointIn) => (dispatch, getState) => {
  const { score } = getState();

  const amount = score[pointIn] + 1;
  const newScore = { ...score, [pointIn]: amount };

  dispatch({ type: SCORE, payload: newScore });
}

export const changeRow = (number) => (dispatch) => {
  dispatch({ type: ROW, payload: number});
}