import React from "react";
import { Button, Grid, Icon } from "semantic-ui-react";
import { connect } from "react-redux";

import { buttonPress } from "../actions";
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
        onClick={() => this.props.buttonPress({ key: letter })}
      />
    );
  }

  rowOne = () => {
    const row = [];

    for (let i = 0; i < 10; i++) {
      row.push(this.letterButton(this.props.keyboard[i]));
    }

    return row;
  }

  rowTwo = () => {
    const row = [];

    for (let i = 10; i < 19; i++) {
      row.push(this.letterButton(this.props.keyboard[i]));
    }

    return row;
  }

  rowThree = () => {
    const enter = "ENTER";
    const backspace = "BACKSPACE";

    const row = [
      <Button 
        className="large-button"
        key={enter}
        content={enter}
        onClick={() => this.props.buttonPress({ key: enter })}
      />
    ];

    for (let i = 19; i < 26; i++) {
      row.push(this.letterButton(this.props.keyboard[i]));
    }

    row.push(
      <Button
        className="large-button"
        key={backspace}
        content={<Icon name="arrow left" />}
        onClick={() => this.props.buttonPress({ key: backspace })}
      />
    )

    return row;
  }

  render() {
    document.addEventListener("keydown", this.props.buttonPress);

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
  return { keyboard: state.keyboard }
};

export default connect(mapStateToProps, { buttonPress })(Keyboard);