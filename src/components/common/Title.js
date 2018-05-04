import React, { Component } from 'react';

class Title extends Component {
  render() {
    const title = `${this.props.index}. ${this.props.title}`;
    return (
        <div style={styles.textStyle}>
          {title}
        </div>
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

export default Title;