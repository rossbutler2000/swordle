import React from "react";
import { Label, Transition } from "semantic-ui-react";

import initialState from "../../data/initialState";
import "./LetterTile.css";


class LetterTile extends React.Component {
  render() {
    const { letterKey, letterObject } = this.props;
    const { animate, color, letter } = letterObject;

    return (
      <Transition
        animation="bounce"
        duration={1000}
        visible={animate}
        key={letterKey}
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
}

export default LetterTile;