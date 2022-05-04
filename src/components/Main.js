import React from "react";
import { connect } from "react-redux";
import { Container }  from "semantic-ui-react";

import FailModal from "./FailModal";
import GuessGrid from "./GuessGrid";
import Header from "./Header";
import Keyboard from "./Keyboard";
import ScoreModal from "./ScoreModal";
import Solver from "./Solver";
import "./Main.css";


class Main extends React.Component {
  getDate = () => {
    const date = new Date();
    return <h2>{date.toDateString()}</h2>
  }

  render() {
    return (
      <div className="app">
        <ScoreModal />
        <FailModal />
        <Solver />
        <Header />

        <div className="game">
          
          <div className="grid-container">
            <Container textAlign="center">{this.getDate()}</Container>
            <GuessGrid />
          </div>

          <div className="keyboard-container">
            <Keyboard />
          </div>

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    today: state.today
  }
}

export default connect(mapStateToProps, null)(Main);