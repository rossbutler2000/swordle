import React from "react";
import { Grid, Label, Popup, Transition } from "semantic-ui-react";
import { connect } from "react-redux";

import LetterTile from "./LetterTile";
import { shakeRow } from "../../actions";
import "../../data/initialState";
import "./GuessGrid.css";
import initialState from "../../data/initialState";

class GuessGrid extends React.Component {
  letterTile = (letterObject, key) => {
    const { animate, color, letter } = letterObject;

    return (
      <Transition
        animation="bounce"
        duration={1000}
        visible={animate}
        key={key}
      >
        <Label
          className="letter-tile" 
          content={letter}
          color={color}
          basic={color === initialState.defaultColor}
        />
      </Transition>
    );
  }

  wordRow = (word, wordKey) => {
    let letterKey = -1;

    const row = word.map(letterObject => {
      letterKey++;

      return <LetterTile key={letterKey} letterObject={letterObject} />;
    });

    return(
        <Transition
          key={wordKey}
          animation="shake"
          duration={500}
          visible={!this.props.rowShake[wordKey]}
        >
          <Grid.Row className="word-row">
            {row}
          </Grid.Row>
        </Transition>
    );
  }

  guessGrid = () => {
    let key = -1;

    const grid = this.props.guesses.map(guess => {
      key++;

      return this.wordRow(guess, key);
    });

    return (
      <Grid className="guess-grid">
        {grid}
      </Grid>
    );
  }

  render() {
    const { errorMessage } = this.props;

    return (
      <Popup
        className="error"
        content={errorMessage}
        position="top center"
        open={errorMessage !== ''}
        on={null}
        trigger={this.guessGrid()}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.errorMessage,
    guesses: state.guesses,
    rowShake: state.rowShake
  };
}

export default connect(mapStateToProps, { shakeRow })(GuessGrid);