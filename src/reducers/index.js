import { combineReducers } from "redux";

import {
  CHARACTER,
  ERROR_MESSAGE,
  FAIL,
  FINISHED,
  GUESSES,
  HELP,
  KEYBOARD,
  LETTER_NUM,
  ROW,
  ROW_SHAKE,
  SCORE,
  SHOW_SCORE,
  TODAYS_WORD
} from "../data/types";
import initialState from "../data/initialState";
const {
  expireDate,
  guesses,
  keyboard,
  letterNum,
  row,
  rowShake,
  score,
  startDate,
  today
} = initialState;

const characterReducer = (char = null, action) => {
  if (action.type === CHARACTER) {
    return action.payload;
  }

  return char;
}

const errorMessageReducer = (error = '', action) => {
  if (action.type === ERROR_MESSAGE) {
    return action.payload;
  }

  return error;
}

const expireDateReducer = (expire = expireDate) => {
  return expire;
}

const failModalReducer = (show = false, action) => {
  if (action.type === FAIL) {
    return action.payload;
  }

  return show;
}

const finishedTodayReducer = (finished = false, action) => {
  if (action.type === FINISHED) {
    return action.payload;
  }

  return finished;
}

const guessReducer = (guessesObject = guesses, action) => {
  if (action.type === GUESSES) {
    return [...action.payload];
  }

  return [...guessesObject];
}

const helpModalReducer = (show = false, action) => {
  if (action.type === HELP) {
    return action.payload;
  }

  return show;
}

const keyboardReducer = (keyBoard = keyboard, action) => {
  if (action.type === KEYBOARD) {
    return [...action.payload];
  }

  return [...keyBoard];
}

const letterNumReducer = (number = letterNum, action) => {
  if (action.type === LETTER_NUM) {
    return action.payload;
  }

  return number;
}

const rowReducer = (number = row, action) => {
  if (action.type === ROW) {
    return action.payload;
  }

  return number;
}

const rowShakeReducer = (shake = rowShake, action) => {
  if (action.type === ROW_SHAKE) {
    return [...action.payload];
  }

  return [...shake];
}

const scoreReducer = (scores = score, action) => {
  if (action.type === SCORE) {
    return {...action.payload};
  }

  return scores;
}

const scoreModalReducer = (value = false, action) => {
  if (action.type === SHOW_SCORE) {
    return action.payload;
  }

  return value;
}

const startDateReducer = (date = startDate) => {
  return date;
}

const todayReducer = (date = today) => {
  return date;
}

const todaysWordReducer = (word = null, action) => {
  if (action.type === TODAYS_WORD) {
    return action.payload;
  }

  return word;
}


export default combineReducers({
  character: characterReducer,
  errorMessage: errorMessageReducer,
  expireDate: expireDateReducer,
  failModal: failModalReducer,
  finishedToday: finishedTodayReducer,
  guesses: guessReducer,
  helpModal: helpModalReducer,
  keyboard: keyboardReducer,
  letterNum: letterNumReducer,
  row: rowReducer,
  rowShake: rowShakeReducer,
  score: scoreReducer,
  scoreModal: scoreModalReducer,
  startDate: startDateReducer,
  today: todayReducer,
  todaysWord: todaysWordReducer,
});
