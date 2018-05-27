import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class PaperCard extends Component {
  render() {
    const { containerStyle, titleStyle, buttonStyle } = styles;
    return (
      <NavLink to={`read-paper/${this.props.id}`}>
        <div style={containerStyle}>
          <h1 style={titleStyle}>{this.props.title}</h1>
          <NavLink to={`blog-post-on-paper/${this.props.id}`}><div style={buttonStyle} className="button is-link">Others' Note</div></NavLink>
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
    position: 'relative',
    paddingRight: 152,
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
    position: 'absolute',
    top: 28,
    right: 20,
    fontSize: 18,
  }
};

export default PaperCard;