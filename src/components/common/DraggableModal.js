import React, { Component } from 'react';

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
      <div id={this.props.id}
           className={`modal${this.state.active ? ' is-active' : ''}`}
           style={styles.modalBackgroundStyle}>
        <div style={styles.modalStyle} className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Modal title</p>
            <button className="delete" aria-label="close" onClick={() => this.setState({active: false})}/>
          </header>
          <section className="modal-card-body">
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
  },
  modalStyle: {
    '-webkit-box-shadow': '2px 2px 2px 2px #bbb',
    '-moz-box-shadow': '2px 2px 2px 2px #bbb',
    'box-shadow': '2px 2px 2px 2px #bbb',
    width: '40vw',
    height: '25vh',
  },
};

export default DraggableModal;