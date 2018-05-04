import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class NavBarItem extends Component {
  render() {
    let itemStyle = styles.itemStyle
    if(this.props.title) {
      const additionalStyle = {
        float: 'left',
      };
      itemStyle = Object.assign({}, itemStyle, additionalStyle);
    } else {
      const additionalStyle = {
        float: 'right',
        fontWeight: '400',
      };
      itemStyle = Object.assign({}, itemStyle, additionalStyle);
    }

    return (
      <NavLink to={this.props.to}><h1 style={itemStyle}>{this.props.children}</h1></NavLink>
    )
  }
}

const styles = {
  itemStyle : {
    color: '#FFFFFF',
    margin: '0 24px',
    fontSize: 21,
  },
};