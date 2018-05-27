import React, { Component } from 'react';


class Recommend extends Component {
  render() {
    return (
      <div className={`modal${this.props.recommend ? ' is-active' : ''}`} style={styles.modalBackgroundStyle}>
        <div className="modal-card" style={styles.modalStyle}>
          <header className="modal-card-head" style={styles.modalHeaderStyle}>
            <p className="modal-card-title">{this.props.recommend ? this.props.recommend.title : ''}</p>
          </header>
          <section className="modal-card-body" style={styles.modalContentStyle}>
            {this.props.recommend ? this.props.recommend.content : ''}
            <div className="button-group" style={styles.modalButtonGroupStyle}>
              <button className="button is-success" style={styles.modalButtonStyle}
                      onClick={this.props.onOkListener}>OK</button>
              <button className="button" style={styles.modalButtonStyle}
                      onClick={this.props.onCancelListener}>Cancel</button>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

const styles = {
  modalBackgroundStyle: {
    width: 'calc(100vw - 400px)',
    height: '180px',
    top: '80%'
  },
  modalStyle: {
    '-webkit-box-shadow': '2px 2px 2px 2px #bbb',
    '-moz-box-shadow': '2px 2px 2px 2px #bbb',
    'box-shadow': '2px 2px 2px 2px #bbb',
    // marginTop: 'calc(100vh - 63px - 200px)',
  },
  modalHeaderStyle: {
    padding: '15px',
  },
  modalContentStyle: {
    padding: '15px',
  },
  modalButtonGroupStyle: {
    display: 'block',
  },
  modalButtonStyle: {
    float: 'right',
    margin: 0,
    marginLeft: '15px',
  },
};

export default Recommend;
