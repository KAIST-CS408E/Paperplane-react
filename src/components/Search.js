import React, { Component } from 'react';
import axios from 'axios';
import SearchResult from './SearchResult';
import {NOTE_URL, PAPER_URL} from "../constants";
import SearchBox from './common/SearchBox';
import { withCookies } from 'react-cookie';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      paperID: '',
      userID: '',
      query: '',
    };
    this.searchNotes = this.searchNotes.bind(this);
  }
  componentWillMount() {
    const { cookies, paperID, searchSection } = this.props;
    const userID = cookies.get('_id');
    this.setState({userID, paperID});

    if (searchSection > 0) {
      this.searchNotes('', searchSection);
    }
  }
  searchNotes(query, section) {
    const { cookies, paperID } = this.props;
    const userID = cookies.get('_id');

    const url = NOTE_URL + `?uid=${userID}&paperId=${paperID}`  + (query ? `&query=${query}`: '') + (section ? `&section=${section}`: '');
    console.log(url);
    let notes = [];

    axios.get(url)
      .then((res) => {
        console.log(res);
        const data = res.data;
        const keys = Object.keys(data);
        for (let i = 0; i < keys.length ; i += 1) {
          const sectionNotes = data[keys[i]];
          notes = notes.concat(sectionNotes);
        }
        this.setState({
          notes
        });
      })
      .catch(err => {
        console.log(err);
      })

  }

  render() {
    return (
      <div>
        <SearchBox query={this.state.query} sectionList={this.props.sectionList} searchNotes={this.searchNotes} searchSection={this.props.searchSection || 0} changeMode={this.props.changeSearchMode} />
        <SearchResult notes={this.state.notes} paper={this.props.paper} pinNote={this.props.pinNote}/>
      </div>
    )
  }
}

export default withCookies(Search);