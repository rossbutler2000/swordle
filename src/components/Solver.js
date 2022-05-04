import React from "react";
import { connect } from "react-redux";

import { backspace, enter, letterPress } from "../actions";

class Solver extends React.Component {

  componentDidUpdate() {
    let { character } = this.props;
    character = character.key.toUpperCase();

    if (!this.props.finishedToday) {
      if (character === "BACKSPACE") {
        this.props.backspace();
      } else if (character === "ENTER") {
        this.props.enter();
      } else if (character.length === 1 && /[a-zA-Z]/.test(character)) {
        this.props.letterPress(character);
      }
    }
  }

  render() {
    return null;
  }
}

const mapStateToProps = (state) => {
  return {
    character: state.character,
    finishedToday: state.finishedToday
  }
}

export default connect(mapStateToProps,
  { backspace, enter, letterPress }
)(Solver);