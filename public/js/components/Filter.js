import React from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

class Filter extends React.Component {
  constructor() {
    super();
    this.filterOnclick = this.filterOnclick.bind(this);
    this.state = {
      activeFilter: "all"
    };
  }

  filterOnclick(e) {
    this.props.filterOnclick(e.target.textContent.toLowerCase());
    this.setState({
      activeFilter: e.target.textContent.toLowerCase()
    });
  }

  render() {
    const categories = [
      "ALL",
      "DRAMA",
      "COMÉDIE",
      "AVENTURE",
      "ROMANCE",
      "CRIME"
    ];
    var filters = [];
    var classes;
    for (var i = 0; i < categories.length; i++) {
      if (categories[i].toLowerCase() === this.state.activeFilter) {
        classes = "filter active";
      } else {
        classes = "filter";
      }
      filters.push(
        <li className={classes} onClick={this.filterOnclick} key={i}>
          {categories[i]}
        </li>
      );
    }
    return (
      <ul className="portfolio-filter list-inline text-center">{filters}</ul>
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
