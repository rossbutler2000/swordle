import React from "react";
import { Button, Grid, Icon } from "semantic-ui-react";
import { connect } from "react-redux";

import {
  changeGuesses,
  changeLetterNum,
  changeRow,
  changeScore,
  checkWord,
  finish,
  firstLetter,
  nextRow,
  shakeRow,
  showFail,
  solve
} from "../actions";
import { NO_FINISH } from "../data/types";
import initialState from "../data/initialState";
import "./Keyboard.css"

class Keyboard extends React.Component {

  letterButton(letterObject) {
    const { color, letter } = letterObject;

    return (
      <Button
        className="letter-button"
        content={letter}
        color={color}
        key={letter}
        onClick={() => this.handlePress(letter)}
      />
    );
  }

  rowOne = () => {
    const row = [];

    for (let i = 0; i < 10; i++) {
      row.push(this.letterButton(this.props.keyBoard[i]));
    }

    return row;
  }

  rowTwo = () => {
    const row = [];

    for (let i = 10; i < 19; i++) {
      row.push(this.letterButton(this.props.keyBoard[i]));
    }

    return row;
  }

  rowThree = () => {
    const row = [
      <Button 
        className="large-button"
        key="enter"
        content="ENTER"
        onClick={this.props.finishedToday ? null : this.handleEnter}
      />
    ];

    for (let i = 19; i < 26; i++) {
      row.push(this.letterButton(this.props.keyBoard[i]));
    }

    row.push(
      <Button
        className="large-button"
        key="delete"
        content={<Icon name="arrow left" />}
        onClick={this.props.finishedToday ? null : this.handleDelete}
      />
    )

    return row;
  }

  handlePress = (letter) => {
    const { guesses, row, letterNum } = this.props;
    const word = [...guesses[row]];

    if (letterNum < 6) {
      if (/[a-zA-Z]/.test(letter)) {
        word[letterNum] = { ...word[letterNum], letter: letter.toUpperCase() };
        guesses[row] = word;

        this.props.changeGuesses(guesses);
        this.props.changeLetterNum(letterNum + 1);
      }
    }
  }

  handleDelete = () => {
    const { guesses, row } = this.props;
    let { letterNum } = this.props;
    const word = [...guesses[row]];

    if (letterNum > 0) {
      letterNum--;
      word[letterNum] = { ...word[letterNum], letter: ' ' };
      guesses[row] = word;

      this.props.changeGuesses(guesses);
      this.props.changeLetterNum(letterNum);
    }
  }

  handleEnter = () => {
    const { row } = this.props;

    // If guess is not long enough
    if (this.props.letterNum < 6) {
      this.props.shakeRow("Word must be 6 letters");
    }
    
    // "letterNum" must be 6
    else if (this.props.letterNum === 6) {
      // When the guess is a real word
      if (this.props.checkWord()) {
        this.props.solve();

        // Correct
        if (this.checkCorrect()) {
          this.props.finish();
          this.props.changeScore(row + 1);
          this.props.changeLetterNum(7);
          this.props.changeRow(initialState.totalRows);
        }
        // Next guess
        else {
          this.props.nextRow();
          this.props.firstLetter();
          
          if (this.props.row === initialState.totalRows) {
            this.props.finish();
            this.props.changeScore(NO_FINISH);
            this.props.showFail(true);
          }
        }
      } else {
        this.props.shakeRow("Must use a real word");
      }
    }
  }

  checkCorrect = () => {
    let check = true;
    const { colors } = initialState;
    const { guesses, row } = this.props;

    guesses[row].forEach(letterObject => {
      if (letterObject.color !== colors[0]) {
        check = false;
      }
    });

    return check;
  }

  keyPress = (event) => {
    if (!this.props.finishedToday) {
      if (event.key === "Backspace") {
        this.handleDelete();
      } else if (event.key === "Enter") {
        this.handleEnter();
      } else if (event.key.length === 1 && /[a-zA-Z]/.test(event.key)) {
        this.handlePress(event.key);
      }
    }
  }

  render() {
    document.addEventListener("keydown", this.keyPress)

    return (
      <Grid className="keyboard-grid">
        <Grid.Row className="keyboard-row">{this.rowOne()}</Grid.Row>
        <Grid.Row className="middle-row">{this.rowTwo()}</Grid.Row>
        <Grid.Row className="keyboard-row">{this.rowThree()}</Grid.Row>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cookies: state.cookies,
    expireDate: state.expireDate,
    finishedToday: state.finishedToday,
    guesses: state.guesses,
    keyBoard: state.keyBoard,
    letterNum: state.letterNum,
    row: state.row,
    todaysWord: state.todaysWord
  }
};

export default connect(mapStateToProps,
  {
    changeGuesses,
    changeLetterNum,
    changeRow,
    changeScore,
    checkWord,
    finish,
    firstLetter,
    nextRow,
    shakeRow,
    showFail,
    solve
  }
)(Keyboard);