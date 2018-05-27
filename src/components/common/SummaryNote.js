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
        <h4 className="title is-4" style={styles.noteTitleStyle}>{note.title || 'No title'}</h4>
        {
          isSummary
            ?
              (
                <article class="message is-link">
                  <div class="message-header">
                    <strong>Summary</strong>
                  </div>
                  <div class="message-body">
                    {noteTag}
                  </div>
                </article>
              )
            : noteTag
        }
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
