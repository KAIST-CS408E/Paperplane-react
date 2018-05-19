import React, { Component } from 'react';
import axios from 'axios';
import NoteReadOnly from './common/NoteReadOnly';
import {NOTE_URL, PAPER_URL} from "../constants";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: null,
      paperID: '',
      userID: ''
    }
  }
  componentWillMount() {
    const { cookies, paperID } = this.props;
    const userID = cookies.get('_id');
    this.setState({userID, paperID});
    this.getNote();
  }
  getNote() {
    const { userID, paperID } = this.state;
    const url = `${NOTE_URL}/?uid=${userID}&paperId=${paperID}`;
    axios.get(url)
      .then((res) => {
        const notes = res.data;
        this.setState({notes});
      })
      .catch((e) => console.log(e));
  }
  getNoteComponent() {
    let noteComponent = [];

    const { notes } = this.state;
    const keys = notes.keys();

    for (let i = 0; i < keys.length ; i += 1) {
      const key = keys[i];
      let sectionNotes = notes[i];
      for (let j = 0 ; j < sectionNotes.length ; j += 1){
        let note = sectionNotes[j];
        noteComponent.push(<NoteReadOnly key={note._id} noteId={note._id} title={note.title} content={note.content}/>);
      }
    }
    return noteComponent;
  }

  render() {
    const noteComponent = this.getNoteComponent();
    return (
      <div>
        {noteComponent}
      </div>
    )
  }
}

export default Search;