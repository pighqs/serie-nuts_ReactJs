import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import SearchNavbar from "./SearchNavbar";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.searchOnclick = this.searchOnclick.bind(this);
    this.linkOnclick = this.linkOnclick.bind(this);
    this.showHideNav = this.showHideNav.bind(this);

    this.state = {
      searchIsON: false,
      activeLink: "HOME",
      navIsVisible: false
    };
  }

  linkOnclick(e) {
    this.props.linkOnclick(e.target.textContent.toLowerCase());
    let value = e.target.textContent;
    this.setState({ activeLink: value });
  }

  searchOnclick(e) {
    this.state.searchIsON === true
      ? this.setState({ searchIsON: false })
      : this.setState({ searchIsON: true });
  }

  showHideNav() {
    this.state.navIsVisible === true
      ? this.setState({ navIsVisible: false })
      : this.setState({ navIsVisible: true });
  }

  render() {

    let linksNavbar = [];
    let linkNavbar, classes;

    if (
      this.props.isLogged != undefined &&
      this.props.isLogged != null &&
      this.props.isLogged != ""
    ) {
      var linksNames = [
        "HOME",
        "MY NUTS",
        "ABOUT",
        "CONTACT",
        "LOGOUT",
        "SEARCH"
      ];
    } else {
      var linksNames = ["HOME", "ABOUT", "CONTACT", "SIGNUPLOGIN"];
    }

    let mobileNavBarClassNames;
      this.state.navIsVisible === true
        ? (mobileNavBarClassNames = "navbar-collapse collapse visible")
        : (mobileNavBarClassNames = "navbar-collapse collapse");


    if (this.state.searchIsON === true) {
      linksNavbar = <SearchNavbar />;

    } else {

      for (let i = 0; i < linksNames.length; i++) {
        let isActive;
        var newClassName;

        if (this.state.searchIsON === true) {
          newClassName = "hide";
        } else {
          newClassName = "show";
        }

        this.props.activeLink.activeLink === undefined
          ? (isActive = this.props.activeLink)
          : (isActive = this.props.activeLink.activeLink);
        if (isActive === linksNames[i].toLowerCase()) {
          classes = "link active";
          classes = newClassName.concat(" link active");
        } else {
          classes = "link";
          classes = newClassName.concat(" link");
        }

        if (linksNames[i] === "SEARCH") {
          linkNavbar = (
            <li className={classes} onClick={this.searchOnclick} key={i}>
              <Link to="/">{linksNames[i]}</Link>
            </li>
          );
        } else if (linksNames[i] === "HOME") {
          linkNavbar = (
            <li className={classes} onClick={this.linkOnclick} key={i}>
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

      
    }

    return (
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target=".navbar-collapse"
              onClick={this.showHideNav}
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
          <div className={mobileNavBarClassNames}>
            <ul className="nav navbar-nav menu-home">{linksNavbar}</ul>
          </div>
        </div>
      </nav>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    linkOnclick: function(value) {
      dispatch({ type: "link", activeLink: value });
    }
  };
};

const mapStateToProps = state => {
  return { activeLink: state.activeLink, isLogged: state.currentUser };
};

const NavbarRedux = connect(mapStateToProps, mapDispatchToProps)(Navbar);

export default NavbarRedux;
