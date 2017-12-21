import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";


import SearchNavbar from "./SearchNavbar";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.searchOnclick = this.searchOnclick.bind(this);
    this.linkOnclick = this.linkOnclick.bind(this);

    this.state = {
      searchIsON: false,
      activeLink: "HOME"
    };
  }


  linkOnclick(e) {
    this.props.linkOnclick(e.target.textContent.toLowerCase());
    var value = e.target.textContent;
    this.setState({ activeLink: value });
  }

  searchOnclick(e) {
    this.state.searchIsON === true
      ? this.setState({ searchIsON: false })
      : this.setState({ searchIsON: true });
      
  }


  render() {
    if (this.props.isLogged != undefined && this.props.isLogged != null && this.props.isLogged != "") {
    var linksNames = ["HOME", "MY NUTS", "ABOUT", "CONTACT", "LOGOUT", "SEARCH"];
    } else {
      var linksNames = ["HOME", "ABOUT", "CONTACT", "SIGNUPLOGIN"];
    }
    var linksNavbar = [];
    var linkNavbar;
    var classes;

    for (var i = 0; i < linksNames.length; i++) {
      var isActive;
      this.props.activeLink.activeLink === undefined ? (isActive = this.props.activeLink):(isActive = this.props.activeLink.activeLink);
      if (isActive === linksNames[i].toLowerCase()) {
        classes = "link active";
      } else {
        classes = "link";
      }
      
      if (linksNames[i] === "SEARCH") {
        linkNavbar = (
          <li className={classes} onClick={this.searchOnclick} key={i}>
            <Link to="/">{linksNames[i]}</Link>
          </li>
        );
      } else {
        linkNavbar = (
          <li className={classes} onClick={this.linkOnclick} key={i}>
            <Link to={linksNames[i].toLowerCase()}>{linksNames[i]}</Link>
          </li>
        );
      }
      linksNavbar.push(linkNavbar);
    }
    
    var searchForm;
    this.state.searchIsON === true
    ? (searchForm = <SearchNavbar />)
    : (searchForm = <span />);
    

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
              {linksNavbar}
              {searchForm}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

function mapDispatchToProps(dispatch, props) {
  return {
    linkOnclick: function(value) {
      dispatch({ type: "link", activeLink: value });
    }
  };
}

function mapStateToProps(state) {
  return { activeLink: state.activeLink, isLogged: state.currentUser };
}

var NavbarRedux = connect(mapStateToProps, mapDispatchToProps)(Navbar);


export default NavbarRedux;
