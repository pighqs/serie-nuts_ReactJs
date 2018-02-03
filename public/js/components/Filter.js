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
      "AVENTURE",
      "COMÉDIE",
      "CRIME",
      "DRAMA",
      "ROMANCE"
    ];
    let filters = [];
    let classes;
    for (let i = 0; i < categories.length; i++) {
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
const mapDispatchToProps = (dispatch, props) => {
  return {
    filterOnclick: function(value) {
      dispatch({ type: "filter", activeFilter: value });
    }
  };
}

const mapStateToProps = (state) => {
  return { activeFilter: state.activeFilter };
}

const FilterRedux = connect(mapStateToProps, mapDispatchToProps)(Filter);

export default FilterRedux;
