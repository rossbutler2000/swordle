import React from "react";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  changeGuesses,
  changeKeyboard,
  changeLetterNum,
  changeRow,
  setExpiryDate,
  selectTodaysWord,
  setCookies,
  setScore,
} from "../actions";
import {
  GUESSES,
  KEYBOARD,
  LAST_VISITED,
  LETTER_NUM,
  ROW,
  SCORE
} from "../data/types";
import Main from "./Main";
import Settings from "./Settings";
import initialState from "../data/initialState";

class App extends React.Component {

  componentDidMount() {
    const { cookies, startDate, today } = this.props;

    // Selects the word for the day
    this.props.selectTodaysWord(
      this.getDateDiff(today, startDate)
    );

    // Creates cookies if none have been created
    if (cookies.get(LAST_VISITED) === undefined) {
      this.createCookies(today);
    }
    else if (this.getDateDiff(today, cookies.get(LAST_VISITED)) > 0) {
      this.newDay(today);
    }

    this.props.setCookies(cookies);
    this.loadCookies();
  }

  getDateDiff(current, before) {
    return Math.floor( (current - before) / (1000*60*60*24) );
  }

  createCookies = (date) => {
    const { cookies, expireDate } = this.props;
    const { guesses, keyboard, letterNum, row, score } = initialState;
    const details = { expires: expireDate, path: '/' };
    
    cookies.set(GUESSES, guesses, { ...details });
    cookies.set(KEYBOARD, keyboard, { ...details });
    cookies.set(LETTER_NUM, letterNum, { ...details });
    cookies.set(ROW, row, { ...details });
    cookies.set(SCORE, score, { ...details });
    cookies.set(LAST_VISITED, date, { ...details });
  }

  newDay = (date) => {
    const { cookies, expireDate } = this.props;
    const { guesses, keyboard, letterNum, row } = initialState;
    const details = { expires: expireDate, path: '/' };
    
    cookies.set(GUESSES, guesses, { ...details });
    cookies.set(KEYBOARD, keyboard, { ...details });
    cookies.set(LETTER_NUM, letterNum, { ...details });
    cookies.set(ROW, row, { ...details });
    cookies.set(LAST_VISITED, date, { ...details });
  }

  loadCookies = () => {
    const { cookies } = this.props;

    this.props.changeGuesses(cookies.get(GUESSES));
    this.props.changeKeyboard(cookies.get(KEYBOARD));
    this.props.changeLetterNum(parseInt(cookies.get(LETTER_NUM)));
    this.props.changeRow(parseInt(cookies.get(ROW)));
    this.props.setScore(cookies.get(SCORE));
  }

  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Main />} />
          <Route path='/settings' element={<Settings />} />
        </Routes>
      </BrowserRouter>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    expireDate: state.expireDate,
    guesses: state.guesses,
    keyBoard: state.keyBoard,
    letterNum: state.letterNum,
    startDate: state.startDate,
    today: state.today,
    todaysWord: state.todaysWord
  }
}

export default connect(mapStateToProps,
  {  
    changeGuesses,
    changeKeyboard,
    changeLetterNum,
    changeRow,
    setExpiryDate,
    selectTodaysWord,
    setCookies,
    setScore,
  }
)(withCookies(App));