import React, { Component } from 'react';

class NoteContent extends Component {
  render() {
    const content = this.props.html || 'Blank content!';
    return (
        <div dangerouslySetInnerHTML={{__html: content}}>
        </div>
    );
  }
}

export default NoteContent;