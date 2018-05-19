import React, { Component } from 'react';


class SummaryNote extends Component {
  render() {
    return (
      <div style={styles.noteSummaryStyle}>
        <h4 className="title is-5" style={styles.noteTitleStyle}>{this.props.note.title || 'No title'}</h4>
        <div dangerouslySetInnerHTML={{ __html: this.props.note.content }} />
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
