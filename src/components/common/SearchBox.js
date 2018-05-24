import React, { Component } from 'react';
import SearchIcon from 'react-icons/lib/fa/search';
import BackIcon from 'react-icons/lib/md/keyboard-arrow-left';
import DownIcon from 'react-icons/lib/io/android-arrow-dropdown';

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      sections: ['1. dsa', 's2', 's3'],
      activeIndex: 0,
      openDropdown: false,
    };
    this.renderDropdownItems = this.renderDropdownItems.bind(this);
  }

  componentWillMount() {
    this.setState({activeIndex: this.props.searchSection});
  }

  renderDropdownItems() {
    const { activeIndex } = this.state;
    let { sectionList } = this.props;
    let items = [];
    items.push(
        <a key={6399} onClick={(e) => {
          this.setState({activeIndex: 0, openDropdown: false});
        }} className={activeIndex === 0 ? "dropdown-item is-active" : "dropdown-item"}>
          All Sections
        </a>
    );
    sectionList.map((e, i) => {
      items.push(
        <a key={i * 6400} onClick={(e) => {
          this.setState({activeIndex: i + 1, openDropdown: false});
        }} className={activeIndex === i + 1 ? "dropdown-item is-active" : "dropdown-item"}>
          {`${i + 1}. ${e.name}`}
        </a>
      )
    });
    return items;
  }

  render() {
    const dropdownItems = this.renderDropdownItems();
    const { activeIndex, openDropdown } = this.state;
    const { sectionList } = this.props;
    return (
      <div style={styles.contentStyle}>
        <div style={styles.searchTitle}>
          <BackIcon style={styles.iconStyle}
                    onClick={() => {
                      this.props.changeMode();
                      this.setState({query: ''});
                    }}/>
          <div style={styles.textStyle}>Search</div>
          <div style={styles.iconStyle}/>
        </div>
        <div style={{display: 'flex', flexDirection: 'column',justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '95%', marginTop: '10px'}}>
            <div style={{fontWeight: '600'}}>Sections</div>
            <div style={{width: '100%'}} class={openDropdown ? "dropdown is-active" : "dropdown"}>
              <div style={{width: '100%'}} onClick={() => this.setState(prevState => {return {openDropdown: !prevState.openDropdown}})} class="dropdown-trigger">
                  <button style={{width: '100%', zIndex: 100}} class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                    <span style={{overflow: 'hidden', textAlign: 'left', width: '100%'}}>{activeIndex > 0 ? `${activeIndex}. ${sectionList[activeIndex - 1].name}` : 'All Sections'}</span>
                    <DownIcon />
                  </button>
              </div>
              <div class="dropdown-menu" id="dropdown-menu" role="menu">
                <div class="dropdown-content">
                  {dropdownItems}
                </div>
              </div>
            </div>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '95%', marginTop: '10px'}}>
            <div style={{fontWeight: '600'}}>Keywords</div>
            <div class="field has-addons">
              <div class="control is-expanded">
                <input style={{width: '100%'}} class="input" type="search" placeholder="Search What Others Think.." />
              </div>
              <div class="control">
                <a class="button is-info">Search</a>
              </div>
            </div>
            </div>
        </div>

        {/*<img style={styles.iconStyle} src={searchIconPath} onClick={() => this.props.searchNotes(this.state.query)}/>*/}
      </div>
    )
  }
}

const styles = {
  contentStyle: {
    width: '100%',
    backgroundColor: '#ffffff',
    height: '20vh',

    '-webkit-box-shadow': '0 1px 2px rgba(10, 10, 10, 0.1)',
    '-moz-box-shadow': '0 1px 2px rgba(10, 10, 10, 0.1)',
    'box-shadow': '0 1px 2px rgba(10, 10, 10, 0.1)',
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
  searchTitle: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    height: '2rem'
  },
  formStyle: {
    display: 'flex',
    alignItems: 'center',
    height: '2.3rem'
  },
  textStyle: {
    fontWeight: '600',
    fontSize: '1.3rem',
    margin: '3px',
  }
};

export default SearchBox;