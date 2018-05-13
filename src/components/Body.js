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
      sections: [],
      paper: null,
      modalContent: null,
      _id: '',
      _paperID: '',
    };
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

        /* TODO: REALLY, REALLY BAD IDEA to use setTimeout() here... */
        setTimeout(() => {
          this.getNote();
          const addModalListener = (item) => {
            return (link) => {
              link.removeAttribute('href');
              link.addEventListener('click', () => {
                this.setState({
                  modalContent: {
                    __html: item.html,
                  },
                });
              });
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

  getNote() {
    const { _id, _paperID } = this.state;
    const url = `${NOTE_URL}/?uid=${_id}&paperId=${_paperID}`;
    axios.get(url)
      .then((res) => {
        const notes = res.data;
        this.setState({notes});
      })
      .catch((e) => console.log(e));
  }


  addNote(i) {
    const { _id, _paperID } = this.state;
    this.setState(prevState => {
      const data = {
        uid: _id,
        paperId: _paperID,
        section: i,
        title: '',
        content: '',
      };
      axios.post(NOTE_URL, data)
        .then((res) => {
          this.getNote();
        })
        .catch((e) => console.log(e));
    })
  }

  render() {
    const noteComponent = [];
    this.state.sections.map((e, i) => {
      noteComponent.push(
          <Title title={e.name} index={i + 1} addNote={() => this.addNote(i)} />
      );
      if (this.state.notes.hasOwnProperty(i)) {
        this.state.notes[i].map((e) => {
          noteComponent.push(<Note _id={e._id} title={e.title} content={e.content}/>);
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
        <div style={styles.leftStyle}>
          <div style={styles.paperStyle} dangerouslySetInnerHTML={this.state.paperContent}>
          </div>
          <div style={{ ...styles.modalStyle, display: this.state.modalContent ? 'block' : 'none' }}
               dangerouslySetInnerHTML={this.state.modalContent}
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
  modalStyle: {
    backgroundColor: 'gray',
    position: 'fixed',
    padding: '10vh 10vw',
    width: '80vw',
    height: '80vh',
  },
};

export default withCookies(Body);