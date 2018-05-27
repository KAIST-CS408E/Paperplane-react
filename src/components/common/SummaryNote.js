import React, { Component } from 'react';
import { contentEmbededHTML } from '../../utils';


class SummaryNote extends Component {
  render() {
    const { note, contents, isSummary } = this.props;
    const noteTag = <div dangerouslySetInnerHTML={{ __html: contentEmbededHTML(note.content) }} />
    return (
      <div className="content" style={{ ...styles.noteSummaryStyle, width: '100%' }}>
        {
          contents.length === 0 ? null
            : contents.map(content => (
              <div className="card" style={styles.embededContentStyle}>
                <div dangerouslySetInnerHTML={{ __html: content.html }} key={content.number} />
              </div>
            ))
        }
        {isSummary ? null : <h4 className="title is-4" style={styles.noteTitleStyle}>{note.title || 'No title'}</h4>}
        <div style={styles.noteTextStyle}>
          {
            isSummary
              ?
              (
                <article className="message is-link">
                  <div className="message-header">
                    <strong style={{ ...styles.noteTitleStyle, marginBottom: 0, }}>Summary</strong>
                  </div>
                  <div className="message-body" style={styles.noteTextStyle}>{noteTag}</div>
                </article>
              )
              : noteTag
          }
        </div>
      </div>
    );
  }
}

const styles = {
  noteSummaryStyle: {
    display: 'inline-block',
    wordBreak: 'break-word',
    padding: '0 5%',
    verticalAlign: 'top',
    marginBottom: '20px',
    fontFamily: 'Georgia, serif',
  },
  embededContentStyle: {
    padding: '15px',
    margin: '15px 0 30px 0',
    ':before': ';;;',
  },
  noteTitleStyle: {
    fontSize: '1.8rem',
    fontWeight: '500',
    marginBottom: '10px',
  },
  noteTextStyle: {
    fontSize: '1.2rem',
  },
};

export default SummaryNote;
