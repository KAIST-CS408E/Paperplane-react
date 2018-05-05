import React, { Component } from 'react';
import addIconPath from '../../icons/add_icon.png';

class Title extends Component {
  render() {
    const title = `${this.props.index}. ${this.props.title}`;
    return (
        <div style={styles.textStyle}>
          {title}
          <img style={styles.iconStyle} src={addIconPath} onClick={this.props.addNote} />
        </div>
    );
  }
}

const styles = {
  textStyle: {
    flex: 1,
    height: '30px',
    fontSize: '1.6rem',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingTop: '3px',
  },
  iconStyle: {
    width: '30px',
    height: '30px',
  }
};

export default Title;