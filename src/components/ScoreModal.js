import React from "react";
import { connect } from "react-redux";
import { Header, Modal, Progress } from "semantic-ui-react";

import { NO_FINISH } from "../data/types";
import { showScore } from "../actions";
import "./ScoreModal.css";

class ScoreModal extends React.Component {
  percentBar = (value) => {
    if (value > 0) {
      return (
        <Progress
          className="stat-bar"
          value={value}
          progress="value"
          size="small"
        />
      );
    } else {
      return <div>&ensp;{value}</div>;
    }
    
  }

  barGraph = () => {
    const { score } = this.props;

    return Object.keys(score).map(key => {
      if (key !== NO_FINISH) {
        return (
          <div className="score-row" key={key}>
            <p>{key}: </p>
            {this.percentBar(score[key])}
          </div>
        );
      }
    });
  }

  stats = () => {
    const { score } = this.props;

    let totalGames = 0;
    let numerator = 0;
    Object.keys(score).forEach(key => {
      numerator += key === NO_FINISH ? 8 * score[NO_FINISH] : key * score[key];
      totalGames += score[key];
    });

    const average = numerator / totalGames;

    return (
      <div>
        Total Games: {totalGames}
        <br />
        Average: {Number.isFinite(average) ? average.toFixed(2) : "None"}
      </div>
    )
  }

  render() {
    return (
      <Modal
        open={this.props.scoreModal}
        closeIcon
        onClose={this.props.showScore}
      >
        <Header>Statistics</Header>
        <Modal.Content className="stats-content">
          <div className="stat-item">
            Guesses:
            <br />
            <br />
            {this.barGraph()}
          </div>
          <div className="stat-item">
            {this.stats()}
          </div>
          </Modal.Content>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    score: state.score,
    scoreModal: state.scoreModal
  };
}

export default connect(mapStateToProps, { showScore })(ScoreModal);