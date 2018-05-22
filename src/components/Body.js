import React, { Component } from 'react';
import axios from 'axios';
import Title from './common/Title';
import Note from './common/Note';
import Recommend from './common/Recommend';
import SearchResult from './SearchResult';
import DraggableModal from './common/DraggableModal';
import SearchBox from './common/SearchBox';
import ContentModal from './common/ContentModal';
import SectionSummaryForm from './common/SectionSummaryForm';
import { BASE_URL, NOTE_URL, PAPER_URL } from '../constants';
import { withCookies } from 'react-cookie';
import '../index.css';
import ReactDOM from 'react-dom';


const RECOMMEND = [
  {
    section: 3,
    title: 'test recommend title',
    content: 'test recommend content',
    wasShown: false,
  },
];


class Body extends Component {
  highlight_helper(paragraph, start, end) {
    let _start = start;
    let _end = end;
    let next;
    let element = paragraph.childNodes[0];
    while(element !== null && _start >= 0 && _end > 0) {
      next = element.nextSibling;
      const textLength = element.textContent.length;
      if(textLength < _start) {
        _start = _start - textLength;
        _end = _end - textLength;
      } else {
        if(element.nodeType === Node.TEXT_NODE) {
          const local_end = Math.min(element.textContent.length, _end);
          const new_node = document.createTextNode(element.textContent.substr(0, _start));
          const mid = document.createElement("SPAN");
          mid.className = 'highlighted';
          mid.appendChild(document.createTextNode(element.textContent.substr(_start, local_end - _start)));
          paragraph.replaceChild(new_node, element);
          paragraph.insertBefore(mid, new_node.nextSibling);
          const end_node = document.createTextNode(element.textContent.substr(local_end, element.textContent.length - local_end));
          paragraph.insertBefore(end_node, new_node.nextSibling.nextSibling);

        } else {
          this.highlight_helper(element, _start, _end);
        }
        _start = 0;
        _end = _end - textLength;
      }
      element = next;
    }
  }

  highlight() {
    let paragraph;
    console.log(this.state.selection);
    const name = this.state.selection.paragraph;
    if(name !== null && name !== undefined) {
      if (name === 'ltx_abstract') {
        paragraph = document.getElementsByClassName(name)[0];
        console.log(paragraph);
      } else {
        paragraph = document.getElementById(name);
      }
      paragraph = paragraph.getElementsByTagName('P')[0];

      this.highlight_helper(paragraph, this.state.selection.start, this.state.selection.end);
    }
    window.getSelection().empty();
  }

  getAnchorPosition(selection) {
    let curr = selection.anchorNode;
    let len = selection.anchorOffset;
    while(true) {
      while(curr.previousSibling !== null) {
        curr = curr.previousSibling;
        len += curr.textContent.length;
      }
      curr = curr.parentNode;
      if(curr.tagName === 'P' || curr.tagName === 'p' || curr === null) {
        break;
      }
    }
    return len;
  }

  getFocusPosition(selection) {
    let curr = selection.focusNode;
    let len = selection.focusOffset;
    while(true) {
      while(curr.previousSibling !== null) {
        curr = curr.previousSibling;
        len += curr.textContent.length;
      }
      curr = curr.parentNode;
      if(curr.tagName === 'P' || curr.tagName === 'p' || curr === null) {
        break;
      }
    }
    return len;
  }

  componentDidMount() {
    const isNav4 = (navigator.appName === "Netscape" && parseInt(navigator.appVersion) === 4);
    const isNav4Min = (navigator.appName === "Netscape" && parseInt(navigator.appVersion) >= 4);
    const isIE4Min = (navigator.appName.indexOf("Microsoft") !== -1 && parseInt(navigator.appVersion) >= 4);

    document.addEventListener('mouseup', (event) => {
      if (isNav4Min) {
        const selection = document.getSelection();
        if (selection.anchorNode.parentNode.closest('p') === selection.focusNode.parentNode.closest('p') && selection.focusOffset !== selection.anchorOffset) {
          const paragraph = selection.anchorNode.parentNode.closest('p').closest('div');
          const name = paragraph.id || paragraph.className;
          document.getElementsByClassName('selector')[0].style.top = Math.abs(document.getElementsByClassName('anchor')[0].getBoundingClientRect().top - selection.getRangeAt(0).getBoundingClientRect().top) - document.getElementsByClassName('selector')[0].getBoundingClientRect().height +'px';
          const anchor = this.getAnchorPosition(selection);
          const focus = this.getFocusPosition(selection);
          const start = Math.min(anchor, focus);
          const end = Math.max(anchor, focus);
          this.setState({
            selected: true,
            selection: {
              paragraph: name,
              start: start,
              end: end,
            },
          });
        } else {
          this.setState({
            selected: false,
          });
        }
      } else if (isIE4Min) {
        if (document.selection) {

          event.cancelBubble = true;
        }
      }
      event.stopPropagation();
    });
  }

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
      selected: false,
      selection: null,
      _paperID: '',
      recommend: null,
      recommendElems: [],
      paperLoaded: false,
      activeModal: false,
      memoModals: [],
      notesLoaded: false,
      search: false,
      searchNotes: [],
    };

    this.highlight = this.highlight.bind(this);
    this.showModal = this.showModal.bind(this);
    this.changeMode = this .changeMode.bind(this);
    this.appendModal = this.appendModal.bind(this);
    this.searchNotes = this.searchNotes.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.addRecommendNote = this.addRecommendNote.bind(this);
    this.cancelRecommend = this.cancelRecommend.bind(this);
    this.detectRecommend = this.detectRecommend.bind(this);
  }

  async componentWillMount() {
    const URL = `${BASE_URL}papers/${this.props.match.params.paperId}`;
    const { cookies } = this.props;
    const _id = cookies.get('_id');
    this.setState({_id});

    /* Fetch the paper from the server and save to state. */
    const paper = await axios.get(PAPER_URL)
      .then(res => res.data[0])
      .catch(alert);
    this.setState({
      paper,
      sections: paper.sections,
      paperContent: {
        __html: paper.content,
      },
      _paperID: paper._id,
      paperLoaded: true,
    });

    /* Fetch notes from the server and save to state. */
    const notes = await axios.get(`${NOTE_URL}/?uid=${_id}&paperId=${paper._id}`)
      .then(res => res.data)
      .catch(alert);
    this.setState({ notes });

    /* Now ready to render section summary form into the paper. */
    this.setState({ notesLoaded: true });
  }

  componentDidUpdate() {
    const prepareHighlight = () => {
      const paperdiv = document.getElementById('paperDiv');
      const anchor = document.createElement('DIV');
      anchor.className = 'anchor';
      paperdiv.insertBefore(anchor, paperdiv.childNodes[0]);
      const selection = document.createElement('DIV');
      selection.id = 'selectionBox';
      selection.className="selector";
      selection.style.position='absolute';
      selection.style.top=84;
      selection.style.left='50%';
      paperdiv.insertBefore(selection, paperdiv.childNodes[0]);
      ReactDOM.render(<button onClick={this.highlight}>highlight</button>, document.getElementById('selectionBox'));
    };

    /* Add onClickListener to figures and equations. */
    const prepareContentModal = () => {
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
    };

    const prepareSectionSummary = () => {
      this.state.paper.sections.forEach(({ number: sectionNumber }) => {
        const summaryFormContainer = document.createElement('div');
        summaryFormContainer.id = `S${sectionNumber}-summary-form-container`;
        document.getElementById(`S${sectionNumber}`).appendChild(summaryFormContainer);
        ReactDOM.render(
          <SectionSummaryForm uid={this.state._id} paperId={this.state.paper._id}
                              sectionNumber={sectionNumber}
                              appendSummary={this.appendSummary}/>,
          summaryFormContainer
        );
      });
    };

    if (this.state.paperLoaded) {
      prepareHighlight();
      prepareContentModal();
      this.setState({ paperLoaded: false });
    }

    if (this.state.notesLoaded) {
      prepareSectionSummary();
      this.setState({ notesLoaded: false });
    }
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
        noteList = prevNotes[section];
        noteIndex = noteList.length;
        noteList.splice(noteIndex, 0, {...newNote, _id: section * 24000 + noteIndex});
      }
      else {
        noteList.splice(noteIndex, 0, {...newNote, _id: section * 24000 + noteIndex});
        prevNotes[section] = noteList;
      }
      axios.post(NOTE_URL, newNote)
        .then((res) => {
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

  appendSummary = (section, summary) => {
    this.setState((prevState) => {
      const updatedNotes = prevState.notes;
      if (updatedNotes[section - 1]) {
        updatedNotes[section - 1].push(summary);
      } else {
        updatedNotes[section - 1] = [summary];
      }

      return {
        notes: updatedNotes,
      };
    });
  };

  showModal(content) {
    this.setState({
      modalContent: {
        __html: content.html,
      }
    });
  }

  hideModal() {
    this.setState({
      modalContent: null,
    });
  };

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

  highlight_helper(paragraph, start, end) {
    let _start = start;
    let _end = end;
    let next;
    let element = paragraph.childNodes[0];
    while(element !== null && element !== undefined && _start >= 0 && _end > 0) {
      next = element.nextSibling;
      const textLength = element.textContent.length;
      if(textLength < _start) {
        _start = _start - textLength;
        _end = _end - textLength;
      } else {
        if(element.nodeType === Node.TEXT_NODE) {
          const local_end = Math.min(element.textContent.length, _end);
          const new_node = document.createTextNode(element.textContent.substr(0, _start));
          const mid = document.createElement("SPAN");
          mid.className = 'highlighted';
          mid.appendChild(document.createTextNode(element.textContent.substr(_start, local_end - _start)));
          paragraph.replaceChild(new_node, element);
          paragraph.insertBefore(mid, new_node.nextSibling);
          const end_node = document.createTextNode(element.textContent.substr(local_end, element.textContent.length - local_end));
          paragraph.insertBefore(end_node, new_node.nextSibling.nextSibling);

        } else {
          this.highlight_helper(element, _start, _end);
        }
        _start = 0;
        _end = _end - textLength;
      }
      element = next;
    }
  }

  highlight() {
    let paragraph;
    console.log(this.state.selection);
    const name = this.state.selection.paragraph;
    if(name !== null && name !== undefined) {
      if (name === 'ltx_abstract') {
        paragraph = document.getElementsByClassName(name)[0];
        console.log(paragraph);
      } else {
        paragraph = document.getElementById(name);
      }
      paragraph = paragraph.getElementsByTagName('P')[0];

      this.highlight_helper(paragraph, this.state.selection.start, this.state.selection.end);
    }
    window.getSelection().empty();
  }

  getAnchorPosition(selection) {
    let curr = selection.anchorNode;
    let len = selection.anchorOffset;
    while(true) {
      while(curr.previousSibling !== null) {
        curr = curr.previousSibling;
        len += curr.textContent.length;
      }
      curr = curr.parentNode;
      if(curr.tagName === 'P' || curr.tagName === 'p' || curr === null) {
        break;
      }
    }
    return len;
  }

  getFocusPosition(selection) {
    let curr = selection.focusNode;
    let len = selection.focusOffset;
    while(true) {
      while(curr.previousSibling !== null) {
        curr = curr.previousSibling;
        len += curr.textContent.length;
      }
      curr = curr.parentNode;
      if(curr.tagName === 'P' || curr.tagName === 'p' || curr === null) {
        break;
      }
    }
    return len;
  }

  componentDidMount() {
    const isNav4 = (navigator.appName === "Netscape" && parseInt(navigator.appVersion) === 4);
    const isNav4Min = (navigator.appName === "Netscape" && parseInt(navigator.appVersion) >= 4);
    const isIE4Min = (navigator.appName.indexOf("Microsoft") !== -1 && parseInt(navigator.appVersion) >= 4);

    /*
    document.addEventListener('mouseup', (event) => {
      if (isNav4Min) {
        const selection = document.getSelection();
        if (selection.anchorNode.parentNode.closest('p') !== null && selection.anchorNode.parentNode.closest('p') === selection.focusNode.parentNode.closest('p') && selection.focusOffset !== selection.anchorOffset) {
          const paragraph = selection.anchorNode.parentNode.closest('p').closest('div');
          const name = paragraph.id || paragraph.className;
          document.getElementsByClassName('selector')[0].style.top = Math.abs(document.getElementsByClassName('anchor')[0].getBoundingClientRect().top - selection.getRangeAt(0).getBoundingClientRect().top) - document.getElementsByClassName('selector')[0].getBoundingClientRect().height +'px';
          const anchor = this.getAnchorPosition(selection);
          const focus = this.getFocusPosition(selection);
          const start = Math.min(anchor, focus);
          const end = Math.max(anchor, focus);
          this.setState({
            selected: true,
            selection: {
              paragraph: name,
              start: start,
              end: end,
            },
          });
          console.log(this.state.selected);
        } else {
          this.setState({
            selected: false,
          });
        }
      } else if (isIE4Min) {
        if (document.selection) {

          event.cancelBubble = true;
        }
      }
      event.stopPropagation();
    });
    */
  }

  searchNotes(query) {
    const { _id, _paperID } = this.state;
    const url = NOTE_URL + `?uid=${_id}&paperId=${_paperID}&query=${query}`;
    let searchNotes = [];
    axios.get(url)
        .then((res) => {
          console.log(res);
          const data = res.data;
          const keys = Object.keys(data);
          for (let i = 0; i < keys.length ; i += 1) {
            const sectionNotes = data[keys[i]];
            searchNotes = searchNotes.concat(sectionNotes);
          }
          this.setState({
            searchNotes,
            search: true
          });
        })
        .catch(err => {
          console.log(err);
        })

  }

  changeMode() {
    this.setState({
      search: false,
      searchNotes: [],
    });
  }

  appendModal(note) {
    this.setState(prevState => {
      let memoModals = prevState.memoModals;
      memoModals.push(note);
      return {memoModals};
    });
  }

  getMemoModals() {
    return (
        this.state.memoModals.map((e, i) => <DraggableModal key={i * 300} id={`memoModal_${i * 300}`} title={e.title} content={e.content}/>)
    )
  }

  getNoteComponent() {
    let noteComponent = [];
    let ex = [];

    let { sections, notes, paper } = this.state;
    for (let i = 0; i < sections.length ; i += 1) {
      let section = sections[i];
      ex.push(section);
      noteComponent.push(
          <Title key={i + 100002} title={section.name} index={i + 1} addNote={() => this.addNote(i)} />
      );

      if (notes.hasOwnProperty(i)) {
        let sectionNotes = notes[i];
        for (let j = 0 ; j < sectionNotes.length ; j += 1){
          let note = sectionNotes[j];
          ex.push(note);
          noteComponent.push(<Note key={note._id} noteId={note._id} title={note.title} content={note.content} paper={paper} showModal={this.showModal} deleteNote={() => this.deleteNote(i, j)}/>);
        }
      }
    }
    return noteComponent;
  }
  render() {
    const noteComponent = this.getNoteComponent();
    const modalComponent = this.getMemoModals();

    const selectionBox = document.getElementById('selectionBox');
    if(selectionBox) {
      selectionBox.display = this.state.selected ? 'inline-block' : 'none';
    }

    return (
      <div id='body'
           style={styles.backgroundStyle}>
        <div style={styles.leftStyle} onScroll={this.detectRecommend}>
          <div style={styles.boxStyle}>
            <div id="paperDiv" style={styles.paperStyle} dangerouslySetInnerHTML={this.state.paperContent}>
            </div>
          </div>
          <Recommend recommend={this.state.recommend}
                     onOkListener={this.addRecommendNote} onCancelListener={this.cancelRecommend}/>
          <ContentModal content={this.state.modalContent} hideModal={this.hideModal} isSummary={false}/>
        </div>
        <div style={styles.rightStyle}>
          <SearchBox searchNotes={this.searchNotes}  changeMode={this.changeMode} />
          {this.state.search ? <SearchResult notes={this.state.searchNotes} paper={this.state.paper} pinNote={this.appendModal}/> : noteComponent}
        </div>
        {modalComponent}
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
    position: 'relative',
  },
  modalStyle: {
    top: '63px',
    width: 'calc(100vw - 400px)',
    height: 'calc(100vh - 63px)',
    overflow: 'hidden',
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
  boxStyle: {
    position: 'relative',
  },
};

export default withCookies(Body);