import React, { Component } from 'react';
import { contentEmbededHTML } from '../../utils';


class SummaryNote extends Component {
  render() {
    const { isSummary } = this.props.note;
    return (
      <div style={{ ...styles.noteSummaryStyle, width: isSummary ? '100%' : '50%' }}>
        <h4 className="title is-4" style={styles.noteTitleStyle}>{this.props.note.title || 'No title'}</h4>
        <div dangerouslySetInnerHTML={{ __html: contentEmbededHTML(this.props.note.content) }} />
      </div>
    );
  }
}

const styles = {
  noteSummaryStyle: {
    display: 'inline-block',
    wordBreak: 'break-word',
    padding: '0 3%',
    verticalAlign: 'top',
    marginBottom: '20px',
  },
  noteTitleStyle: {
    marginBottom: '5px',
  },
};

export default SummaryNote;
