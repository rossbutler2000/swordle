import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

import { showHelp, showScore } from "../actions";
import "./Header.css";

class Header extends React.Component {

  render() {
    return (
      <Menu fluid borderless>

        <Menu.Item position="left">
          <Menu.Item position="left" 
            icon="question circle"
            onClick={this.props.showHelp}
          />
          <Menu.Item position="left" />
        </Menu.Item>

        <Menu.Item ><h1 className="title">Swordle</h1></Menu.Item>

        <Menu.Item position="right">
          <Menu.Item
            icon="trophy"
            position="right"
            onClick={this.props.showScore}
          />
          {/* <Link to="/settings">
            <Menu.Item icon="setting" position="right" />
          </Link> */}
        </Menu.Item>
        
      </Menu>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
} 

export default connect(mapStateToProps, { showHelp, showScore })(Header);