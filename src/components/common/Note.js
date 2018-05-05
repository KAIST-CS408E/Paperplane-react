import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import './Note.css';
import TextArea from 'react-textarea-autosize';
import editIconPath from '../../icons/edit_icon.png';

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'read',
      title: 'dd',
      content: '',
    };
  }

  changeTitleMode(e) {
    this.setState({mode: 'fix'});
    e.stopPropagation();
  }

  onEnterKeyPress(e) {
    if (e.which === 13) {
      this.setState({mode: 'read'});
    }
    e.stopPropagation();
  }

  render() {
    const trigger = this.state.mode === 'read' ?
        <div>{this.state.title} <img style={styles.iconStyle} src={editIconPath} onClick={(e) => this.changeTitleMode(e)} /></div> :
        (
            <div onKeyPress={(e) => this.onEnterKeyPress(e)} onClick={(e) => e.stopPropagation()}>
              <TextArea
                  style={styles.titleTextArea}
                  minRows={1}
                  maxRows={1}
                  placeholder={'Write title!'}
                  onChange={event => this.setState({ title: event.target.value })}
                  value={this.state.title} />
            </div>
        );
    return (
      <Collapsible trigger={trigger} transitionTime={100}>
        <TextArea
          style={styles.textArea}
          minRows={4}
          placeholder={'Write something meaningful to you!'}
          onChange={event => this.setState({ content: event.target.value })}
          value={this.state.content} />
      </Collapsible>
    );
  }
}

const styles = {
  textStyle: {
    flex: 1,
    height: '30px',
    fontSize: '1.5rem',
    fontStyle: 'bold',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    paddingLeft: '10px',
  },
  textArea: {
    borderWidth: '1px',
    borderColor: '#efefef',
    padding: '0.8rem',
    fontSize: '1.2rem',
    fontWeight: 400,
    lineHeight: '160%',
    width: '90%',
    outline: 'none',
  },
  titleTextArea: {
    borderWidth: '0px',
    borderBottomWidth: '1px',
    borderBottomColor: '#efefef',
    padding: '0.3rem',
    fontSize: '1.2rem',
    fontWeight: 400,
    lineHeight: '100%',
    width: '95%',
    outline: 'none',
  },
  iconStyle: {
    width: '20px',
    height: '20px',
  }
};

export default Note;