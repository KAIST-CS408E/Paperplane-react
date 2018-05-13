import React, { Component } from 'react';
import axios from 'axios';
import Title from './common/Title';
import Note from './common/Note';
import Recommend from './common/Recommend';
import { NOTE_URL, PAPER_URL } from '../constants';
import { withCookies } from 'react-cookie';


const RECOMMEND = [
  {
    section: 3,
    title: 'test recommend title',
    content: 'test recommend content',
    wasShown: false,
  },
];


class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      paperContent: {
        __html: '',
      },
      sections: [],
      paper: null,
      modalContent: null,
      _id: '',
      _paperID: '',
      recommend: null,
      recommendElems: [],
    };

    this.showModal = this.showModal.bind(this);
    this.getNote = this.getNote.bind(this);
    this.addRecommendNote = this.addRecommendNote.bind(this);
    this.cancelRecommend = this.cancelRecommend.bind(this);
    this.detectRecommend = this.detectRecommend.bind(this);
  }

  componentWillMount() {
    const { cookies } = this.props;
    const _id = cookies.get('_id');
    this.setState({_id});

    axios.get(PAPER_URL)
      .then((res) => {
        const paper = res.data[0];
        this.setState({
          paper,
          sections: paper.sections,
          paperContent: {
            __html: paper.content,
          },
          _paperID: paper._id,
        });

        /* Add onClickListener to figures and equations. */
        /* TODO: REALLY, REALLY BAD IDEA to use setTimeout() here... */
        setTimeout(() => {
          this.getNote();
          const addModalListener = (item) => {
            return (link) => {
              link.removeAttribute('href');
              link.style.textDecoration = 'underline';
              link.addEventListener('click', () => this.showModal(item));
            };
          };

          this.state.paper.figures.forEach((figure) => {
            const imageLinks = document.querySelectorAll(`a[href$=".${figure.number}"]`);
            imageLinks.forEach(addModalListener(figure));
          });

          this.state.paper.equations.forEach((equation) => {
            const equationLinks = document.querySelectorAll(`a[href$=".${equation.number}"]`);
            equationLinks.forEach(addModalListener(equation));
          });

          /* Save recommend elements. */
          this.setState({
            recommendElems: RECOMMEND.map(recommend => document.getElementById(`S${recommend.section}`)),
          });
        }, 2000);
      })
      .catch();
  }

  getNote() {
    const { _id, _paperID } = this.state;
    const url = `${NOTE_URL}/?uid=${_id}&paperId=${_paperID}`;
    console.log(url);
    axios.get(url)
      .then((res) => {
        const notes = res.data;
        console.log(res);
        this.setState({notes});
      })
      .catch((e) => console.log(e));
  }


  addNote(section, title, content) {
    const { _id, _paperID } = this.state;
    this.setState(prevState => {
      let newNote = {
        uid: _id,
        paperId: _paperID,
        section: section,
        title: title || '',
        content: content || '',
      };
      let prevNotes = prevState.notes;
      let noteList = [];
      let noteIndex = 0;
      if (prevNotes.hasOwnProperty(section)) {
        let noteList = prevNotes[section];
        let noteIndex = noteList.length;
        noteList.splice(noteIndex, 0, newNote);
      }
      else {
        noteList.splice(noteIndex, 0, newNote);
        prevNotes[section] = noteList;
      }
      axios.post(NOTE_URL, newNote)
        .then((res) => {
          console.log(res);
          // this.getNote();
          prevNotes[section][noteIndex] = {...newNote, _id: res.data._id};
          this.setState({notes: prevNotes});
        })
        .catch((e) => console.log(e));
      return {
        notes: prevNotes,
      };
    })
  }

  deleteNote(section, noteId) {
    this.setState(prevState => {
      let prevNotes = prevState.notes;
      let noteList = prevNotes[section];
      noteList.splice(noteId, 1);
      return {
        notes: prevNotes,
      };
    });
  }

  showModal(content) {
    this.setState({
      modalContent: {
        __html: content.html,
      }
    });
  }

  addRecommendNote() {
    /* TODO: add a new note. */
    const currentRec = this.state.recommend;
    const { section, title, content } = currentRec;
    this.addNote(section - 1, title, content);
    this.setState({
      recommend: null,
    });
  }

  cancelRecommend() {
    this.setState({
      recommend: null,
    });
  }

  detectRecommend(e) {
    if (this.state.recommend) return;

    const windowRect = e.target.getBoundingClientRect();
    for (let i = 0; i < this.state.recommendElems.length; i++) {
      if (RECOMMEND[i].wasShown) continue;

      const recommendElem = this.state.recommendElems[i];
      const recommendRect = recommendElem.getBoundingClientRect();
      if (recommendRect.top > windowRect.top && recommendRect.top < windowRect.top + 150) {
        RECOMMEND[i].wasShown = true;
        this.setState({
          recommend: RECOMMEND[i],
        });
        break;
      }
    }
  }

  render() {
    const noteComponent = [];
    this.state.sections.map((e, i) => {
      noteComponent.push(
          <Title title={e.name} index={i + 1} addNote={() => this.addNote(i)} />
      );
      if (this.state.notes.hasOwnProperty(i)) {
        this.state.notes[i].map((e1, i1) => {
          console.log(i)
          console.log(e1)
          noteComponent.push(<Note noteId={e1._id} title={e1.title} content={e1.content} paper={this.state.paper} showModal={this.showModal} deleteNote={() => this.deleteNote(i, i1)}/>);
        })
      }
    });

    const hideModal = () => {
      this.setState({
        modalContent: null,
      });
    };

    return (
      <div style={styles.backgroundStyle}>
        <div style={styles.leftStyle} onScroll={this.detectRecommend}>
          <div style={styles.paperStyle} dangerouslySetInnerHTML={this.state.paperContent}>
          </div>
          <Recommend recommend={this.state.recommend}
                     onOkListener={this.addRecommendNote} onCancelListener={this.cancelRecommend}/>
          <div className={`modal${this.state.modalContent ? ' is-active' : ''}`}
               style={styles.modalStyle}
               onClick={hideModal}>
            <div className="modal-background" style={styles.modalBackgroundStyle}></div>
            <div className="modal-content" dangerouslySetInnerHTML={this.state.modalContent}
                 style={styles.modalContentStyle}>
            </div>
          </div>
        </div>
        <div style={styles.rightStyle}>
          {noteComponent}
        </div>
      </div>
    );
  }
}

const styles = {
  backgroundStyle: {
    display: 'flex',
    height: 'calc(100vh - 63px)',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftStyle: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
  },
  rightStyle: {
    width: '400px',
    backgroundColor: '#828282',
  },
  paperStyle: {
    flex: 1,
    maxWidth: 'calc(100vw - 400px)',
    backgroundColor: 'white',
    height: '100%',
    margin: 'auto',
    overflowY: 'scroll',
    padding: '0 30px',
  },
  modalStyle: {
    top: '63px',
    width: 'calc(100vw - 400px)',
    height: 'calc(100vh - 63px)',
  },
  modalBackgroundStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalContentStyle: {
    backgroundColor: 'white',
    padding: '20px',
  },
  noteModalStyle: {
    backgroundColor: 'gray',
    position: 'fixed',
    padding: '10vh 10vw',
    width: '80vw',
    height: '80vh',
  },
};

export default withCookies(Body);