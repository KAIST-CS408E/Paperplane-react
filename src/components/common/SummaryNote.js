import React, { Component } from 'react';
import { contentEmbededHTML } from '../../utils';


class SummaryNote extends Component {
  render() {
    const { note, contents } = this.props;
    const { isSummary } = note;
    return (
      <div style={{ ...styles.noteSummaryStyle, width: '100%'/*isSummary ? '100%' : '50%'*/ }}>
        {
          contents.length === 0 ? null
            : contents.map(content => (
              <div className="card" style={styles.embededContentStyle}>
                <div dangerouslySetInnerHTML={{ __html: content.html }} key={content.number} />
              </div>
            ))
        }
        <h4 className="title is-4" style={styles.noteTitleStyle}>{note.title || 'No title'}</h4>
        <div dangerouslySetInnerHTML={{ __html: contentEmbededHTML(note.content) }} />
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
  embededContentStyle: {
    padding: '15px',
    margin: '15px 0 30px 0',
  },
  noteTitleStyle: {
    marginBottom: '5px',
  },
};

export default SummaryNote;
