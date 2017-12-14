import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { FormControl } from "react-bootstrap";

class SearchNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.onSearchInputChange = this.onSearchInputChange.bind(this);
    this.onSearchClick = this.onSearchClick.bind(this);
    this.state = {
      value: "",
      searchSubmit: false
    };
  }

  onSearchInputChange(e) {
    this.setState({ value: e.target.value });
  }
  onSearchClick() {
    // envoie du state à fonction onSearchClick du container redux
    this.props.onSearchClick(this.state.value);
    this.setState({
      searchSubmit: true
    });
  }

  render() {
    if (this.state.searchSubmit === true) {
      return <Redirect to="/searchresults" />;
    } else {
      return (
        <div className="input-group">
          <FormControl
            className="navbarSearchInput"
            type="text"
            value={this.state.value}
            placeholder="browse serie"
            onChange={this.onSearchInputChange}
          />
          <span className="input-group-btn">
            <button
              className="btn btn-warning btn-pill"
              onClick={this.onSearchClick}
            >
              <i className="fa fa-search" />
            </button>
          </span>
        </div>
      );
    }
  }
}

function mapDispatchToProps(dispatch, props) {
  return {
    onSearchClick: function(value) {
      //console.log(value);
      dispatch({ type: "search", searchValue: value });
    }
  };
}

var SearchNavbarRedux = connect(null, mapDispatchToProps)(SearchNavbar);

export default SearchNavbarRedux;
