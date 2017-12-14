import React from "react";
import { Link } from "react-router-dom";

import { FormControl } from 'react-bootstrap';

class SearchNavbar extends React.Component {
  constructor() {
    super();
    this.onSearchInputChange = this.onSearchInputChange.bind(this);
    this.state = {
      value: ""
    }
  }

  onSearchInputChange(e) {
    console.log(e.target.value);
    this.setState({ value: e.target.value });
  }

  render() {
    return (
      <div className="input-group">
        <FormControl
          type="text"
          value={this.state.value}
          placeholder="browse serie"
          onChange={this.onSearchInputChange}
        />
        <span className="input-group-btn"><button className="btn btn-warning btn-pill">
          <i className="fa fa-search" />
        </button>
        </span>
      </div>
    );
  }
}

export default SearchNavbar;
