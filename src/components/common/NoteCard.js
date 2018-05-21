import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class NoteCard extends Component {
  render() {
    const { containerStyle, titleStyle, buttonStyle } = styles;
    return (
      <NavLink to={`hi2/${this.props.id}`}>
        <div style={containerStyle}>
          <h1 style={titleStyle}>{this.props.id}'s note</h1>
          <div>
            <h2 style={{display: 'inline', color: '#444444'}}>32 votes&nbsp;&nbsp;&nbsp;&nbsp;</h2>
            <h2 style={{display: 'inline', color: '#444444'}}>1232 views</h2>
          </div>
        </div>
      </NavLink>
    );
  }
}

const styles = {
  containerStyle: {
    marginLeft: '12px',
    marginRight: '12px',
    width: 400,
    height: 100,
    borderRadius: 4,
    border: '1px solid #EEEEEE',
    boxShadow: '1px 1px #CCCCCC',
    padding: '10px 20px',
    textAlign: 'left',
    position: 'relative',
    marginTop: 24,
    display: 'inline-flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  titleStyle: {
    color: 'black',
    fontSize: 21,
    fontWeight: '500',
  },
};

export default NoteCard;