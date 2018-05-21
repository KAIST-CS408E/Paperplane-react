import React, { Component } from 'react';
import axios from 'axios';
import { withCookies } from 'react-cookie';
import { BASE_URL, NOTE_URL, PAPER_URL } from '../constants';
import NoteCard from './common/NoteCard';

class NoteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paper: null,
      commentList: [],
    }
  }

  componentWillMount() {
    axios.get(`${BASE_URL}/papers/${this.props.match.params.paperId}`).
    then((response) => {
      this.setState({
        paper: response.data.title,
      })
    }).catch((response) => {

    });
    axios.get(`${BASE_URL}notes?paperId=${this.props.match.params.paperId}`).
    then((response) => {
      const idList = [];
      console.log(response.data)
      const resultList = response.data;
      let i;
      for (i in resultList) {
        const sectionComments = resultList[i];
        for(let j =0; j < sectionComments.length; j++) {
          idList.unshift(sectionComments[j].createdBy);
        }
      }
      const new_idList = idList.filter((el, i, a) => i === a.indexOf(el));
      this.setState({
        commentList: new_idList,
      });
    }).catch((response) => {

    });
  }
  render() {
    const { containerStyle, titleStyle } = styles;
    const noteList = this.state.commentList.map((e) => {
      return <NoteCard id={e}/>;
    });
    return(
      <div style={containerStyle}>
        <h1 style={titleStyle}>Other people's notes on {this.state.paper}</h1>
        { noteList }
      </div>
    );
  }
}

const styles = {
  containerStyle: {
    width: 960,
    margin: 'auto',
    padding: '24px 24px',
    textAlign: 'center',
  },
  titleStyle: {
    color: 'black',
    fontSize: 32,
  }
};

export default withCookies(NoteList);