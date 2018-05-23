import React, { Component } from 'react';
import NoteContent from './NoteContent';

class DraggableModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      active: true,
    };
  }

  componentDidMount() {
    let contextmenu = document.getElementById(this.props.id);
    let initX, initY, mousePressX, mousePressY;

    contextmenu.addEventListener('mousedown', function(event) {

      initX = this.offsetLeft;
      initY = this.offsetTop;
      mousePressX = event.clientX;
      mousePressY = event.clientY;


      function repositionElement(event) {
        this.style.left = initX + event.clientX - mousePressX + 'px';
        this.style.top = initY + event.clientY - mousePressY + 'px';
      }

      this.addEventListener('mousemove', repositionElement);

      window.addEventListener('mouseup', function() {
        contextmenu.removeEventListener('mousemove', repositionElement);
      });

    }, false);

  }

  render() {
    const { title, content } = this.props;
    return (
      <div id={this.props.id}
           className={`modal${this.state.active ? ' is-active' : ''}`}
           style={styles.modalBackgroundStyle}>
        <div style={styles.modalStyle} className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">{title}</p>
            <button className="delete" aria-label="close" onClick={() => this.setState({active: false})}/>
          </header>
          <section className="modal-card-body">
            <NoteContent html={content}/>
          </section>
        </div>
      </div>
    )
  }
}

const styles = {
  contentStyle: {
    display: 'flex',
    width: '100%',
    backgroundColor: '#ffffff',
  },
  inputStyle: {
    width: '93%',
    height: '30px',
    fontSize: '1.2rem',
  },
  iconStyle: {
    width: '30px',
    height: '30px',
  },
  modalBackgroundStyle: {
    position: 'fixed',
    top: '100px',
    left: '100px',
    width: '40vw',
    height: '25vh',

    borderTopLeftRadius: '6px',
    borderTopRightRadius: '6px',

    '-webkit-box-shadow': '0 1px 2px rgba(10, 10, 10, 0.1)',
    '-moz-box-shadow': '0 1px 2px rgba(10, 10, 10, 0.1)',
    'box-shadow': '0 1px 2px rgba(10, 10, 10, 0.1)',
  },
  modalStyle: {
    width: '40vw',
    height: '25vh',
  },
};

export default DraggableModal;