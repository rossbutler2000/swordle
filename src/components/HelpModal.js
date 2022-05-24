import React from "react";
import { connect } from "react-redux";
import { Header, Modal } from "semantic-ui-react";


import LetterTile from "./GuessGrid/LetterTile";
import { showHelp } from "../actions"
import initialState from "../data/initialState";
import "./HelpModal.css";

class HelpModal extends React.Component {
  letterObj0 = { animate: true, color: initialState.colors[0], letter: 'G' };
  letterObj1 = { animate: true, color: initialState.colors[1], letter: 'Y' };
  letterObj2 = { animate: true, color: initialState.colors[2], letter: 'B' };

  tile = (letterObj) => {
    return (
      <div className="tile">
        <LetterTile
          letterObject={letterObj}
          letterKey={letterObj.letter}
        />
      </div>
    );
  }

  render() {
    return (
      <Modal
        closeIcon
        open={this.props.helpModal}
        onClose={this.props.showHelp}
      >
        <Header textAlign="center">HOW TO PLAY</Header>
        <Modal.Content>
          Swordle is a game where you try to
          guess a six letter word with 7 tries.
          <br />
          <br />
          Each day the word changes for a new 
          opportuntiy to guess it.
          <br />
          <br />
          After each guess, the letters will change 
          color to give you information about your
          guess.
          <br />
          <br />
          <hr />

          {initialState.colors[0].toUpperCase()} indicates 
          the correct letter in the correct place:
          {this.tile(this.letterObj0)}

          <br />

          {initialState.colors[1].toUpperCase()} indicates
          correct letter in the wrong place:
          {this.tile(this.letterObj1)}

          <br />

          {initialState.colors[2].toUpperCase()} indicates
          that letter is not in the word.
          {this.tile(this.letterObj2)}
        </Modal.Content>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return { helpModal: state.helpModal };
}

export default connect(mapStateToProps, { showHelp })(HelpModal);