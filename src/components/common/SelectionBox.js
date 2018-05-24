import React, { Component } from 'react';
import './bubble.css';
import Pencil from 'react-icons/lib/fa/pencil';
import Underline from 'react-icons/lib/fa/underline';


class SelectionBox extends Component {
  render() {
    return (
      <div className="speech-bubble nonactive" style={{zIndex: 500}}>
        <div onClick={this.props.onClickLeft} className="bubble-selection-left" style={{flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Pencil style={{color: 'white', fontSize: 18}}/>
        </div>
        <div onClick={this.props.onClickRight} className="bubble-selection-right"  style={{flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Underline style={{color: 'white', fontSize: 18}}/>
        </div>
      </div>
    );
  }
}

export default SelectionBox;