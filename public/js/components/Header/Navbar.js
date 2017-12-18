import React from "react";
import { Link } from "react-router-dom";

import SearchNavbar from './SearchNavbar';

class Navbar extends React.Component {

  constructor() {
    super();
    
    this.searchOnclick = this.searchOnclick.bind(this);
    this.state = { searchIsON : false };
  }

  searchOnclick() {
    this.state.searchIsON === true ? this.setState({ searchIsON: false}) : this.setState({ searchIsON: true}) ;  
  }


  render() {
    var searchForm;
    this.state.searchIsON === true ? searchForm = <SearchNavbar/> : searchForm = <span></span>;  
    return (
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target=".navbar-collapse"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <Link to="/" className="navbar-brand">
              <img src="images/peanut_gold.png" alt="logo" />
              
            </Link>
          </div>
          <div className="navbar-collapse collapse">
            <ul className="nav navbar-nav menu-home">
              <li className="active">
                <Link to="/">HOME</Link>
              </li>
              <li>
                <Link to="/about">ABOUT</Link>
              </li>
              <li>
                <Link to="/contact">CONTACT</Link>
              </li>
              <li onClick={this.searchOnclick}>
                <Link to="/">SEARCH</Link>
              </li>
              {searchForm}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
