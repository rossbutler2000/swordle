import {
  COOKIE,
  ERROR_MESSAGE,
  EXPIRY_DATE,
  FAIL,
  FINISHED,
  GUESSES,
  KEYBOARD,
  LETTER_NUM,
  ROW,
  ROW_SHAKE,
  SCORE,
  TODAYS_WORD
} from "../data/types";
import "../data/initialState";
import { randomWords } from "../data/randomizedList";
import { ALL_WORDS } from "../data/ALLWORDS";
import initialState from "../data/initialState";


export const changeGuesses = (guesses) => (dispatch, getState) => {
  const { cookies, expireDate } = getState();
  cookies.set(GUESSES, guesses, { expires: expireDate, path: '/' });

  dispatch({ type: GUESSES, payload: guesses });
}

export const changeKeyboard = (keyboard) => (dispatch, getState) => {
  const { cookies, expireDate } = getState();
  cookies.set(KEYBOARD, keyboard, { expires: expireDate, path: '/' });

  dispatch({ type: KEYBOARD, payload: keyboard });
}

export const changeLetterNum = (number) => (dispatch, getState) => {
  const { cookies, expireDate } = getState();
  cookies.set(LETTER_NUM, number, { expires: expireDate, path: '/' });

  dispatch({ type: LETTER_NUM, payload: number });
}

export const changeScore = (pointIn) => (dispatch, getState) => {
  const { cookies, expireDate, score } = getState();

  const amount = score[pointIn] + 1;
  const newScore = { ...score, [pointIn]: amount };

  cookies.set(SCORE, newScore, { expires: expireDate, path: '/' });
  dispatch({ type: SCORE, payload: newScore });
}

export const changeRow = (number) => (dispatch, getState) => {
  const { cookies, expireDate } = getState();
  cookies.set(ROW, number, { expires: expireDate, path: '/' });

  dispatch({ type: ROW, payload: number});
}

export const checkWord = () => (dispatch, getState) => {
  const { guesses, row } = getState();
  let word = "";
  guesses[row].forEach(letterObject => {
    word += letterObject.letter;
  })

  return ALL_WORDS.includes(word.toLocaleLowerCase());
}

export const finish = () => (dispatch, getState) => {
  const { cookies, expireDate } = getState();
  cookies.set(FINISHED, true, { expires: expireDate, path: '/' });

  dispatch({ type: FINISHED, payload: true });
}

export const firstLetter = () => {
  return { type: LETTER_NUM, payload: 0 };
}

export const nextRow = () => (dispatch, getState) => {
  const { cookies, expireDate, row } = getState();
  cookies.set(ROW, row + 1, { expires: expireDate, path: '/' });

  dispatch({ type: ROW, payload: row + 1 })
}

export const selectTodaysWord = (number) => {
  return { type: TODAYS_WORD, payload: randomWords[number].toUpperCase() };
}

export const setCookies = (cookie) => {
  return { type: COOKIE, payload: cookie};
}

export const setExpiryDate = (date) => {
  return { type: EXPIRY_DATE, payload: date };
}

export const setScore = (score) => (dispatch, getState) => {
  const { cookies, expireDate } = getState();
  cookies.set(SCORE, score, { expires: expireDate, path: '/' });

  dispatch({ type: SCORE, payload: score });
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

export const showFail = (show) => {
  return { type: FAIL, payload: show };
}

export const solve = () => (dispatch, getState) => {
  const { cookies, expireDate, guesses, keyBoard, row, todaysWord } = getState();
  const { colors } = initialState;
  const newGuesses = [...guesses];
  const guess = [...guesses[row]];
  let correctWord = todaysWord;
  let guessedWord = "";
  const replaceLetters = {};
  

  // Finds greens
  for (let i = 0; i < todaysWord.length; i++) {
    if (guess[i].letter === correctWord[i]) {
      guess[i] = { ...guess[i], color: colors[0] };
      correctWord = correctWord.substring(0, i) + ' ' + correctWord.substring(i+1);
      guessedWord += ' ';
      replaceLetters[guess[i].letter] = colors[0];
    } else {
        guessedWord += guess[i].letter;
    }
  }


  // Finds yellows
  for (let i = 0; i < todaysWord.length; i++) {
    const yellowLetter = correctWord.indexOf(guessedWord[i]);

    if (guessedWord[i] !== ' ' && yellowLetter > -1) {
      guess[i] = { ...guess[i], color: colors[1] };
      guessedWord = guessedWord.substring(0, i) + ' ' + guessedWord.substring(i+1);
      correctWord =
        correctWord.substring(0, yellowLetter) + ' ' + correctWord.substring(yellowLetter+1);
      
      if (replaceLetters[guess[i].letter] !== colors[0]) {
        replaceLetters[guess[i].letter] = colors[1];
      }
    }
  }
  
  // Finds greys
  for (let i = 0; i < todaysWord.length; i++) {
    if (guessedWord[i] !== ' ') {
      guess[i] = { ...guess[i], color: colors[2] };

      if (replaceLetters[guess[i].letter] !== colors[0] && replaceLetters[guess[i].letter] !== colors[1]) {
        replaceLetters[guess[i].letter] = colors[2];
      }
    }
  }

  newGuesses[row] = guess;
  
  // Changes keyboard colors
  const newKeyboard = keyBoard.map(key => {
    if (key.letter in replaceLetters && key.color !== colors[0]) {
      return { ...key, color: replaceLetters[key.letter] };
    } else {
      return { ...key };
    }
  });

  cookies.set(GUESSES, newGuesses, expireDate);
  cookies.set(KEYBOARD, newKeyboard, expireDate);

  dispatch({ type: GUESSES, payload: newGuesses });
  dispatch({ type: KEYBOARD, payload: newKeyboard });
}
