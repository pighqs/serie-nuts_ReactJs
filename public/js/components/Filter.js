import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from "react-redux";



class Filter extends React.Component {

    constructor() {
        super();
        this.filterOnclick = this.filterOnclick.bind(this);
        //this.state = { activeFilter : "all" };
    }

    filterOnclick(e) {
      this.props.filterOnclick(e.target.textContent.toLowerCase());
      this.setState({
        activeFilter: e.target.textContent.toLowerCase()
      });
    }

  render() {
    return (
        <ul className="portfolio-filter list-inline text-center">
            <li
            className="filter"
            onClick={this.filterOnclick}>           
                ALL
            </li>
            <li
            className="filter"
            onClick={this.filterOnclick}>
                DRAMA
            </li>
            <li
            className="filter"
            onClick={this.filterOnclick}>
                COMEDY
            </li>
            <li
            className="filter"
            onClick={this.filterOnclick}>
                ADVENTURE
            </li>
            <li
            className="filter"
            onClick={this.filterOnclick}>
                ROMANCE
            </li>
            <li
            className="filter"
            onClick={this.filterOnclick}>
                CRIME
            </li>
          </ul>
    );
  }
}
function mapDispatchToProps(dispatch, props) {
  return {
    filterOnclick: function(value) {
      dispatch({ type: "filter", activeFilter: value });
    }
  };
}

function mapStateToProps(state) {
  return { activeFilter: state.activeFilter };
}

var FilterRedux = connect(mapStateToProps, mapDispatchToProps)(Filter);

export default FilterRedux;
