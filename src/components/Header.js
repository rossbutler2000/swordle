import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

import "./Header.css";

class Header extends React.Component {

  render() {
    return (
      <Menu fluid borderless>

        <Menu.Item position="left">
          <Menu.Item position="left" />
          <Menu.Item position="left" />
        </Menu.Item>

        <Menu.Item ><h1 className="title">Swordle</h1></Menu.Item>

        <Menu.Item position="right">
          <Menu.Item icon="trophy" position="right" />
          {/* <Link to="/settings">
            <Menu.Item icon="setting" position="right" />
          </Link> */}
        </Menu.Item>
        
      </Menu>
    )
  }
}

export default Header;