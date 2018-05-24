import React, { Component } from 'react';
import axios from 'axios';
import { withCookies } from 'react-cookie';
import { BASE_URL, NOTE_URL, PAPER_URL } from '../constants';
import NoteCard from './common/NoteCard';

class NoteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paper: {
        title: null
      },
      commentList: [],
    }
  }

  componentWillMount() {
    axios.get(`${BASE_URL}/papers/${this.props.match.params.paperId}`).
    then((response) => {
      console.log(response);
      this.setState({
        paper: response.data,
      })
    }).catch((response) => {

    });
    axios.get(`${BASE_URL}notes?paperId=${this.props.match.params.paperId}`).
    then((response) => {
      console.log(response);
      const idList = [];
      const resultList = response.data;
      let i;
      for (i in resultList) {
        const sectionComments = resultList[i];
        for(let j =0; j < sectionComments.length; j++) {
          idList.unshift({name: sectionComments[j].createdUserName, id: sectionComments[j].createdUserId, uid: sectionComments[j].createdBy});
        }
      }
      const new_idList = idList.filter((el, i, a) => {
        return i === a.findIndex((t) => {
            return t.name === el.name && t.id === el.id;
          });
      });
      this.setState({
        commentList: new_idList,
      });
      console.log(new_idList);
    }).catch((response) => {

    });
  }
  render() {
    const { containerStyle, titleStyle } = styles;
    const noteList = this.state.commentList.map((e) => {
      return <NoteCard user={e} paperId={this.props.match.params.paperId} />;
    });
    return(
      <div style={containerStyle}>
        <h1 style={titleStyle}>Other people's notes on {this.state.paper.title}</h1>
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