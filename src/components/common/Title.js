import React, { Component } from 'react';
import addIconPath from '../../icons/add_icon.png';

class Title extends Component {
  render() {
    const title = `${this.props.index}. ${this.props.title}`;
    // return (
    //     <section style={styles.textStyle} class="hero is-small is-link is-bold">
    //       <div class="hero-body">
    //         <div class="container">
    //           <h1 style={{display: 'flex', justifyContent: 'space-between'}}class="title">
    //             {title}
    //
    //             <img style={styles.iconStyle} src={addIconPath} onClick={this.props.addNote} />
    //           </h1>
    //         </div>
    //       </div>
    //     </section>
    //
    // );
    return (
        <div style={styles.titleStyle}>
          {title}
          <img style={styles.iconStyle} src={addIconPath} onClick={this.props.addNote} />
        </div>
    )
    {/*<div style={styles.textStyle}>*/}
    {/*{title}*/}
    {/*<img style={styles.iconStyle} src={addIconPath} onClick={this.props.addNote} />*/}
    {/*</div>*/}
  }
}

const styles = {
  textStyle: {
    fontSize: '1rem',
    overflow: 'auto',
    width: '25vw',
  },
  titleStyle: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    overflow: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'hsl(217, 71%, 53%)',
    color: 'white',
    padding: '10px',
  },
  iconStyle: {
    width: '30px',
    height: '30px',
    cursor: 'pointer',
    marginLeft: '3px'
  }
};

export default Title;