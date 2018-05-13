import React, { Component } from 'react';
import axios from 'axios';
import Title from './common/Title';
import Note from './common/Note';
import {NOTE_URL, PAPER_URL} from '../constants';
import { withCookies } from 'react-cookie';


class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      paperContent: {
        __html: '',
      },
      paper: null,
      paperModalContent: null,
      noteModalContent: null,
      _id: '',
      _paperID: '',
    };

    this.showModal = this.showModal.bind(this);
  }

  componentWillMount() {
    const { cookies } = this.props;
    const _id = cookies.get('_id');
    this.setState({_id});

    data.map((e, i) => {
      this.state.notes.push(e);
    });

    axios.get(PAPER_URL)
      .then((res) => {
        const paper = res.data[0];
        this.setState({
          paper,
          paperContent: {
            __html: paper.content,
          },
          _paperID: paper._id,
        });

        /* TODO: REALLY, REALLY BAD IDEA to use setTimeout() here... */
        setTimeout(() => {
          const addModalListener = (item) => {
            return (link) => {
              link.removeAttribute('href');
              link.addEventListener('click', () => this.showModal(item, 'paper'));
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
        }, 2000);
      })
      .catch();
  }


  addNote(i) {
    this.setState(prevState => {
      let prevNote = prevState.notes;
      // axios.post(NOTE_URL, {id, password})
      //   .then((res) => {
      //     const {uid, nickname, _id} = res.data;
      //     cookies.set('id', uid, { path: '/' });
      //     cookies.set('nickname', nickname, { path: '/' });
      //     cookies.set('_id', _id, { path: '/' });
      //     this.props.history.replace('/hi2');
      //   })
      //   .catch((e) => console.log(e));
      prevNote[i].notes.push(<Note/>);
      return {notes: prevNote};
    })
  }

  showModal(content, type) {
    this.setState({
      [`${type}ModalContent`]: {
        __html: content.html,
      }
    });
  }

  render() {
    const noteComponent = [];
    this.state.notes.map((e, i) => {
      noteComponent.push(
          <Title title={e.title} index={i + 1} addNote={() => this.addNote(i)} />
      );
      e.notes.map((e) => {
        noteComponent.push(<Note paper={this.state.paper} showModal={this.showModal}/>);
      })
    });

    const hideModal = () => {
      this.setState({
        paperModalContent: null,
        noteModalContent: null,
      });
    };

    return (
      <div style={styles.backgroundStyle}>
        <div style={styles.leftStyle}>
          <div style={styles.paperStyle} dangerouslySetInnerHTML={this.state.paperContent}>
          </div>
          <div style={{ ...styles.paperModalStyle, display: this.state.paperModalContent ? 'block' : 'none' }}
               dangerouslySetInnerHTML={this.state.paperModalContent}
               onClick={hideModal}>
          </div>
          <div style={{ ...styles.noteModalStyle, display: this.state.noteModalContent ? 'block' : 'none' }}
               dangerouslySetInnerHTML={this.state.noteModalContent}
               onClick={hideModal}>
          </div>
        </div>
        <div style={styles.rightStyle}>
          {noteComponent}
        </div>
      </div>
    );
  }
}

const data = [
  {
    title: 'Introduction',
    notes: [],
  },
  {
    title: 'Deep Image Representation',
    notes: [],
  },
  {
    title: 'Result',
    notes: [{title: 'State of the art result', body: 'This is total insane!'}],
  },
  {
    title: 'Discussion',
    notes: [],
  },
];

const styles = {
  backgroundStyle: {
    display: 'flex',
    height: 'calc(100vh - 57px)',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftStyle: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'blue',
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
  paperModalStyle: {
    backgroundColor: 'gray',
    position: 'fixed',
    padding: '10vh 10vw',
    width: '80vw',
    height: '80vh',
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