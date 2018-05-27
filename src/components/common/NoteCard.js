import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class NoteCard extends Component {
  render() {
    console.log(this.props);
    const { containerStyle, titleStyle, buttonStyle } = styles;
    console.log(this.props.user);
    return (
      <NavLink to={`/summary/${this.props.paperId}/${this.props.user.uid}`}>
        <div style={containerStyle}>
          <h1 style={titleStyle}>{this.props.user.name}'s note</h1>
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
    padding: '10px 30px',
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