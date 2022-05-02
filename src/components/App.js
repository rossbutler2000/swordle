import React from "react";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { selectTodaysWord } from "../actions";
import CookieManager from "./CookieManager";
import Main from "./Main";
import Settings from "./Settings";

class App extends React.Component {

  componentDidMount() {
    const { startDate, today } = this.props;

    // Selects the word for the day
    this.props.selectTodaysWord(
      this.getDateDiff(today.getTime(), startDate)
    );
  }

  getDateDiff(current, before) {
    return Math.floor( (current - before) / (1000*60*60*24) );
  }

  render() {
    return (
      <div>
        <CookieManager cookies={this.props.cookies} />
        <BrowserRouter>
          <Routes>
            <Route path='/' exact element={<Main />} />
            <Route path='/settings' element={<Settings />} />
          </Routes>
        </BrowserRouter>
      </div>
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
  };
}

export default connect(mapStateToProps, { selectTodaysWord } )(withCookies(App));