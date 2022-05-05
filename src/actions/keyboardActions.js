import {
  CHARACTER, FAIL,
  FINISHED, GUESSES,
  LETTER_NUM, NO_FINISH, ROW
} from "../data/types";
import {
  changeGuesses, changeLetterNum,
  changeRow, changeScore
} from "./change";
import { shakeRow } from "./error";
import { bounce, checkCorrect, checkWord, solve } from "./solver";
import initialState from "../data/initialState";


export const backspace = () => (dispatch, getState) => {
  const { guesses, row } = getState();
  let { letterNum } = getState();
  const word = [...guesses[row]];

  if (letterNum > 0) {
    letterNum--;
    word[letterNum] = { ...word[letterNum], letter: ' ' };
    guesses[row] = word;

    dispatch({ type: GUESSES, payload: guesses });
    dispatch({ type: LETTER_NUM, payload: letterNum });
  }
}

export const buttonPress = (character) => {
  return { type: CHARACTER, payload: character };
}

export const enter = () => (dispatch, getState) => {
  const { letterNum, row } = getState();
  
  // If guess is not long enough
  if (letterNum < 6) {
    dispatch(shakeRow("Word must be 6 letters"));
  }
  
  // "letterNum" must be 6
  else if (letterNum === 6) {
    // When the guess is a real word
    if (dispatch(checkWord())) {
      dispatch(solve());

      // Correct
      if (dispatch(checkCorrect())) {
        dispatch({ type: FINISHED, payload: true });
        dispatch(changeScore(row + 1));
        dispatch(bounce());
        dispatch(changeLetterNum(initialState.totalLetters));
        dispatch(changeRow(initialState.totalRows));
      }
      // Next guess
      else {
        dispatch({ type: ROW, payload: row + 1 });
        dispatch({ type: LETTER_NUM, payload: 0 });
        
        if (row+1 === initialState.totalRows) {
          dispatch({ type: FINISHED, payload: true });
          dispatch(changeScore(NO_FINISH));
          dispatch({ type: FAIL, payload: true });
        }
      }
    } else {
      dispatch(shakeRow("Must use a real word"));
    }
  }
}

export const letterPress = (letter) => (dispatch, getState) => {
  const { guesses, row, letterNum } = getState();
  const word = [...guesses[row]];

  if (letterNum < 6) {
    if (/[a-zA-Z]/.test(letter)) {
      word[letterNum] = { ...word[letterNum], letter: letter.toUpperCase() };
      guesses[row] = word;

      dispatch(changeGuesses(guesses));
      dispatch(changeLetterNum(letterNum + 1));
    }
  }
}