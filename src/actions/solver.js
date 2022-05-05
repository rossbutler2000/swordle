import { GUESSES, KEYBOARD, SHOW_SCORE } from "../data/types";
import { ALL_WORDS } from "../data/ALLWORDS";
import initialState from "../data/initialState";

export const bounce = () => (dispatch, getState) => {
  const { guesses, row } = getState();
  const newGuesses = [...guesses];
  const guess = [...guesses[row]];
  let time = 0;

  for (let i = 0; i < guess.length; i++) {
  
    setTimeout(() => {
      guess[i] = { ...guess[i], animate: false };
      newGuesses[row] = guess;
      dispatch({ type: GUESSES, payload: newGuesses });

      guess[i] = { ...guess[i], animate: true };
      newGuesses[row] = guess;
      dispatch({ type: GUESSES, payload: newGuesses });
    }, time);

    time += 100;
  }

  setTimeout(() => {dispatch({type: SHOW_SCORE, payload: true })}, time + 1200);
}

export const checkCorrect = () => (dispatch, getState) => {
  let check = true;
  const { colors } = initialState;
  const { guesses, row } = getState();

  guesses[row].forEach(letterObject => {
    if (letterObject.color !== colors[0]) {
      check = false;
    }
  });

  return check;
}

export const checkWord = () => (dispatch, getState) => {
  const { guesses, row } = getState();
  let word = "";
  guesses[row].forEach(letterObject => {
    word += letterObject.letter;
  })

  return ALL_WORDS.includes(word.toLocaleLowerCase());
}

export const solve = () => (dispatch, getState) => {
  const { guesses, keyboard, row, todaysWord } = getState();
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
  const newKeyboard = keyboard.map(key => {
    if (key.letter in replaceLetters && key.color !== colors[0]) {
      return { ...key, color: replaceLetters[key.letter] };
    } else {
      return { ...key };
    }
  });

  dispatch({ type: GUESSES, payload: newGuesses });
  dispatch({ type: KEYBOARD, payload: newKeyboard });
}