import React, { Component } from 'react';
import Plane from 'react-icons/lib/fa/paper-plane';

import NavBarItem from './NavBarItem';

export default class NavBar extends Component {
  render() {
    return (
      <div style={styles.navBarStyle}>
        <div style={styles.containerStyle}>
          <NavBarItem title to="/"><Plane/>&nbsp;PAPERPLANE</NavBarItem>
          <NavBarItem to="/hi2">Title3</NavBarItem>
          <NavBarItem to="/hi1">Title2</NavBarItem>
          <NavBarItem to="/">Title1</NavBarItem>
          <div style={{ clear:'both' }} />
        </div>
      </div>
    )
  }
}

const styles = {
  navBarStyle : {
    backgroundColor: '#1453a5',
    position: 'fixed',
    width: '100%',
  },
  containerStyle : {
    maxWidth: 1200,
    margin: 'auto',
    padding: '16px 0'
  },
};