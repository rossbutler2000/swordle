import React from "react";
import { connect } from "react-redux";
import { Header, Modal, Progress } from "semantic-ui-react";

import "./ScoreModal.css";

class ScoreModal extends React.Component {
  percentBar = (value) => {
    return (
      <Progress className="stat-bar" percent={value} size="small" />
    );
  }

  barGraph = () => {
    const { score } = this.props;

    return Object.keys(score).map(key => {
      return (
        <div className="score-row" key={key}>
          <p>{key}:</p>
          {this.percentBar(score[key])}
        </div>
      )
    });
  }

  stats = () => {
    return (
      <div>Hi</div>
    )
  }

  render() {
    return (
      <Modal open={this.props.showModal}>
        <Header>Statistics</Header>
        <Modal.Content className="stats-content">
          <div className="stat-item">
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
    showModal: state.showModal
  };
}

export default connect(mapStateToProps, null)(ScoreModal);