import React from "react";
import { connect } from "react-redux";
import { Modal } from "semantic-ui-react";

import { showFail } from "../actions";

class FailModal extends React.Component {
  render() {
    return (
      <Modal
        closeIcon
        open={this.props.failModal}
        onClose={() => this.props.showFail(false)}
        size="tiny"
      >
        <Modal.Header>Sorry</Modal.Header>
        <Modal.Content>
          Today's word is:
          <br />
          <br />
          <b>{this.props.todaysWord}</b>
        </Modal.Content>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    failModal: state.failModal,
    todaysWord: state.todaysWord
  }
}

export default connect(mapStateToProps, { showFail })(FailModal);