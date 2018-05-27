import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class PaperCard extends Component {
  render() {
    const { containerStyle, titleStyle, buttonStyle } = styles;
    return (
      <NavLink to={`read-paper/${this.props.id}`}>
        <div style={containerStyle}>
          <h1 style={titleStyle}>{this.props.title}</h1>
          <NavLink to={`blog-post-on-paper/${this.props.id}`}><div style={buttonStyle}>Others' Note</div></NavLink>
        </div>
      </NavLink>
    );
  }
}

const styles = {
  containerStyle: {
    margin: 'auto',
    width: 720,
    height: 100,
    borderRadius: 4,
    border: '1px solid #EEEEEE',
    boxShadow: '1px 1px #CCCCCC',
    padding: '10px 20px',
    paddingRight: 104,
    position: 'relative',
    marginTop: 24,
    display: 'flex',
    alignItems: 'center'
  },
  titleStyle: {
    color: 'black',
    fontSize: 21,
    fontWeight: '500',
  },
  buttonStyle: {
    backgroundColor: '#1453a5',
    width: 84,
    color: 'white',
    fontSize: 18,
    borderRadius: 4,
    padding: '4px 8px',
    position: 'absolute',
    boxShadow: '1px 1px #CCCCCC',
    top: 18,
    right: 20,
  }
};

export default PaperCard;