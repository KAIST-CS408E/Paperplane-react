import React, { Component } from 'react';

class NoteContent extends Component {
  render() {
    return (
      <div dangerouslySetInnerHTML={this.props.html}>
      </div>
    )
  }
}

export default NoteContent;