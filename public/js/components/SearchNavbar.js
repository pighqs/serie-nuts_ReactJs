import React from "react";
import { Link } from "react-router-dom";
import { connect } from'react-redux';

import { FormControl } from 'react-bootstrap';



class SearchNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.onSearchInputChange = this.onSearchInputChange.bind(this);
    this.test = this.test.bind(this);
    
    this.state = {
      value: ""
    }
  }

  test() {
    this.props.onSearchClick(this.state.value);
  }

  onSearchInputChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    return (
      <div className="input-group btn-pill">
        <FormControl
          type="text"
          value={this.state.value}
          placeholder="browse serie"
          onChange={this.onSearchInputChange}
        />
        <span className="input-group-btn">
          <button 
          className="btn btn-warning btn-pill" 
          onClick={this.test}
          >
            <i className="fa fa-search" />
        </button>
        </span>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch, props) {
  return {
    onSearchClick: function(recu) { 
      console.log(recu);
        //dispatch( {type: 'search', searchValue : this.state.value } ) 
    }
  }
}

var SearchNavbarRedux = connect(
  null,
  mapDispatchToProps
)(SearchNavbar);

export default SearchNavbarRedux;
