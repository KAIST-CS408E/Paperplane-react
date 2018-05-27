import React, { Component } from 'react';
import NoteReadOnly from './common/NoteReadOnly';

class SearchResult extends Component{
  constructor(props){
    super(props);
    this.pinNote = this.pinNote.bind(this);
  }
  pinNote(e, note) {
    const { title, content } = note;
    this.props.pinNote({ title, content });
    e.stopPropagation();
  }
  renderNotes() {
    const { notes } = this.props;
    return notes.map((e, i) => <NoteReadOnly key={e._id} title={e.title} content={e.content} paper={this.props.paper} quote={e.quote} pinNote={this.pinNote}/>)
  }
  render() {
    const notes = this.renderNotes();
    return (
        <div>
          {notes}
        </div>
    )
  }
}

export default SearchResult;