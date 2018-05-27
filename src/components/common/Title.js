import React, { Component } from 'react';
import NoteAddIcon from 'react-icons/lib/md/note-add';
import SearchIcon from 'react-icons/lib/md/search';

class Title extends Component {
  constructor(props) {
    super(props);
    this.state = {

      isHovering: false,
    }

    this.handleMouseOn = this.handleMouseOn.bind(this);
    this.handleMouseOff = this.handleMouseOff.bind(this);
  }
  handleMouseOn() {
    this.setState(prevState => {
      return {isHovering: true}
    });
  }
  handleMouseOff() {
    this.setState(prevState => {
      return {isHovering: false}
    });
  }

  render() {
    const title = `${this.props.index}. ${this.props.title}`;
    const { isHovering } = this.state;
    return (
        <div style={styles.titleStyle}
             onMouseEnter={this.handleMouseOn}
             onMouseLeave={this.handleMouseOff}>
          <div style={styles.textStyle}>{title}</div>
          {
            isHovering ? (
                <div style={{display: 'flex'}}>
                  <SearchIcon style={styles.iconStyle} onClick={this.props.searchSection}/>
                  <NoteAddIcon style={styles.iconStyle} onClick={this.props.addNote}  />
                </div>
            ) : null
          }
        </div>
    );
  }
}

const styles = {
  textStyle: {
    fontSize: '1.5rem',
    overflow: 'auto',
    width: '25vw',
  },
  titleStyle: {
    fontWeight: 'bold',
    overflow: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'hsl(217, 71%, 53%)',
    color: 'white',
    padding: '10px',
  },
  iconStyle: {
    width: '25px',
    height: '25px',
    cursor: 'pointer',
    marginLeft: '3px'
  }
};

export default Title;