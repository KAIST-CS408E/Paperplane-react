import React, { Component } from 'react';


class SummaryNote extends Component {
  render() {
    return (
      <div style={styles.noteSummaryStyle}>
        <h4 className="title is-5" style={styles.noteTitleStyle}>{this.props.note.title}</h4>
        <div>
          {this.props.note.content}
        </div>
      </div>
    );
  }
}

const styles = {
  noteSummaryStyle: {
    display: 'inline-block',
    width: '50%',
    wordBreak: 'break-word',
    padding: '0 3%',
  },
  noteTitleStyle: {
    marginBottom: '5px',
  },
};

export default SummaryNote;
