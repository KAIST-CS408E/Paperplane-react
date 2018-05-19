import React, { Component } from 'react';

class DraggableModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    };
  }

  componentDidMount() {
    let contextmenu = document.getElementById('contextMenu');
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
  // onMouseDown(e) {
  //   let initX, initY, mousePressX, mousePressY;
  //   console.log(e);
  //
  //   initX = this.offsetLeft;
  //   initY = this.offsetTop;
  //   mousePressX = e.clientX;
  //   mousePressY = e.clientY;
  //
  //   function repositionElement(event) {
  //     this.style.left = initX + event.clientX - mousePressX + 'px';
  //     this.style.top = initY + event.clientY - mousePressY + 'px';
  //   }
  //
  //   this.addEventListener('mousemove', repositionElement, false);
  //
  //   window.addEventListener('mouseup', function() {
  //     this.removeEventListener('mousemove', repositionElement, false);
  //   }, false);
  //
  //
  // }

  render() {
    return (
      <div id='contextMenu'
           className={`modal${this.props.active ? ' is-active' : ''}`}
           style={styles.modalBackgroundStyle}>
        <div style={styles.modalStyle} className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Modal title</p>
            <button className="delete" aria-label="close" />
          </header>
          <section className="modal-card-body">
          </section>
          <footer className="modal-card-foot">
            <button className="button is-success">Save changes</button>
            <button className="button">Cancel</button>
          </footer>
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
    width: 'calc(100vw - 400px)',
    height: '150px',
  },
  modalStyle: {
    '-webkit-box-shadow': '2px 2px 2px 2px #bbb',
    '-moz-box-shadow': '2px 2px 2px 2px #bbb',
    'box-shadow': '2px 2px 2px 2px #bbb',
  },
};

export default DraggableModal;