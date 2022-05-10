import React from "react";
import { connect } from "react-redux";

import {
  changeGuesses,
  changeKeyboard,
  changeLetterNum,
  changeRow,
  changeScore,
  setExpiryDate,
  selectTodaysWord,
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
import initialState from "../data/initialState";

class CookieManager extends React.Component {

  componentDidMount() {
    const { cookies, expireDate, today } = this.props;
    let lastVisited = cookies.get(LAST_VISITED);
    
    // Creates cookies if none have been created
    if (lastVisited === undefined) {
      this.createCookies();
    } 
    // Loads cookies only if they are of that day
    else {
      lastVisited = new Date(cookies.get(LAST_VISITED));

      if (today.getDate() - lastVisited.getDate() === 0) {
        this.loadCookies();
      }

      this.props.setScore(cookies.get(SCORE));
    }

    cookies.set(LAST_VISITED, today, { expires: expireDate });
  }

  componentDidUpdate() {
    const {
      cookies, expireDate, guesses,
      keyboard, letterNum, row, score
    } = this.props;
    const details = { expires: expireDate, path: "/" };

    cookies.set(GUESSES, guesses, details);
    cookies.set(KEYBOARD, keyboard, details);
    cookies.set(LETTER_NUM, letterNum, details);
    cookies.set(ROW, row, details);
    cookies.set(SCORE, score, details);
  }

  createCookies = () => {
    const { cookies, expireDate } = this.props;
    const { guesses, keyboard, letterNum, row, score } = initialState;
    const details = { expires: expireDate, path: '/' };
    console.log(typeof(expireDate))
    
    cookies.set(GUESSES, guesses, { expires: expireDate, path: '/' });
    cookies.set(KEYBOARD, keyboard, details);
    cookies.set(LETTER_NUM, letterNum, details);
    cookies.set(ROW, row, details);
    cookies.set(SCORE, score, details);
  }

  loadCookies = () => {
    const { cookies } = this.props;

    this.props.changeGuesses(cookies.get(GUESSES));
    this.props.changeKeyboard(cookies.get(KEYBOARD));
    this.props.changeLetterNum(parseInt(cookies.get(LETTER_NUM)));
    this.props.changeRow(parseInt(cookies.get(ROW)));
    this.props.changeScore(cookies.get(SCORE));
  }

  getDateDiff(current, before) {
    return Math.floor( (current - before) / (1000*60*60*24) );
  }

  render() {
    return null;
  }
}

const mapStateToProps = (state) => {
  return {
    expireDate: state.expireDate,
    guesses: state.guesses,
    keyboard: state.keyboard,
    letterNum: state.letterNum,
    row: state.row,
    score: state.score,
    test: state.test,
    today: state.today,
    startDate: state.startDate
  };
}

export default connect(mapStateToProps,
  {  
    changeGuesses,
    changeKeyboard,
    changeLetterNum,
    changeRow,
    changeScore,
    setExpiryDate,
    selectTodaysWord,
    setScore,
  }
)(CookieManager);