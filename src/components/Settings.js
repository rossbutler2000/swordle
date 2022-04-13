import React from "react";
import { Container, Item } from "semantic-ui-react";

class Settings extends React.Component {

  render() {
    return (
      <Container textAlign="center">
        <Item.Group divided>
          <Item>Dark Mode</Item>
        </Item.Group>
      </Container>
    );
  }
}

export default Settings;