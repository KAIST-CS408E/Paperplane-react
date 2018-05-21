import React, { Component } from 'react';
import searchIconPath from '../../icons/search_icon.png';
import backIconPath from '../../icons/back_icon.png';

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    };
  }
  render() {
    return (
      <div style={styles.contentStyle}>
        <img style={styles.iconStyle} src={backIconPath} onClick={() => {
          this.props.changeMode();
          this.setState({query: ''});
        }}/>
        <input style={styles.inputStyle} type='text' placeholder={'Check what others think!'} value={this.state.query} onChange={e => this.setState({query: e.target.value})} />
        <img style={styles.iconStyle} src={searchIconPath} onClick={() => this.props.searchNotes(this.state.query)}/>
      </div>
    )
  }
}

const styles = {
  contentStyle: {
    display: 'flex',
    width: '100%',
    backgroundColor: '#ffffff',
  },
  inputStyle: {
    width: '93%',
    height: '30px',
    fontSize: '1.2rem',
  },
  iconStyle: {
    width: '30px',
    height: '30px',
  },
};

export default SearchBox;