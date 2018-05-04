import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import './Note.css';

class Note extends Component {
  render() {
    return (
      <Collapsible trigger="Start here">
        <p>This is the collapsible content. It can be any element or React component you like.</p>
        <p>It can even be another Collapsible component. Check out the next section!</p>
      </Collapsible>
    );
  }
}

const styles = {
  textStyle: {
    flex: 1,
    height: '30px',
    fontSize: '1.5rem',
    fontStyle: 'bold',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    paddingLeft: '10px',
  }
};

export default Note;