import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class NouveautesSingle extends React.Component {
  constructor() {
    super();
    this.onClickMovetoSingle = this.onClickMovetoSingle.bind(this);
    this.addFav = this.addFav.bind(this);
    this.delFav = this.delFav.bind(this);

    this.state = {
      favsFromDB: []
    };
  }

  onClickMovetoSingle() {
    // envoi du state à fonction onSearchClick du container redux
    this.props.onClickMovetoSingle(this.props.idserie);
  }

  addFav() {
    var that = this;

    this.props.addFav(this.props.idserie);

    var nut = new FormData();
    nut.append("nut_id", this.props.idserie);
    nut.append("user_id", this.props.isLogged);

    fetch("/addfav", {
      method: "post",
      body: nut
    })
      .then(response => response.json())
      .then(function(datasFromBack) {});

    let favsFromDBplusNew = this.props.favsFromDB;
    favsFromDBplusNew.push(this.props.idserie);
    this.setState({
      favsFromDB: favsFromDBplusNew
    });
  }

  delFav() {
    var that = this;
    this.props.delFav(this.props.idserie);

    var nut = new FormData();
    nut.append("nut_id", this.props.idserie);
    nut.append("user_id", this.props.isLogged);

    fetch("/delfav", {
      method: "post",
      body: nut
    })
      .then(response => response.json())
      .then(function(datasFromBack) {});

    let favsFromDBminusNew = this.props.favsFromDB;
    let indexFavToDel = favsFromDBminusNew.indexOf(this.props.idserie);
    favsFromDBminusNew.splice(indexFavToDel, 1);
    this.setState({
      favsFromDB: favsFromDBminusNew
    });
  }

  render() {
    var nutIcon;
    var singleIcon;
    var linkToLike;
    var linkToSingle;
    if (
      this.props.isLogged != undefined &&
      this.props.isLogged != null &&
      this.props.isLogged != ""
    ) {
      linkToLike = "/";
      linkToSingle = this.props.link;
      singleIcon = (
        <i className="lnr lnr-eye" onClick={this.onClickMovetoSingle} />
      );

      if (this.props.favsFromDB.includes(this.props.idserie)) {
        nutIcon = <i className="lnr lnr-poop" onClick={this.delFav} />;
      } else {
        nutIcon = <i className="lnr lnr-heart" onClick={this.addFav} />;
      }
    } else {
      nutIcon = <i className="lnr lnr-lock" />;
      singleIcon = <i className="lnr lnr-lock" />;
      linkToLike = "/signuplogin";
      linkToSingle = "/signuplogin";
    }

    return (
      <li
        className="col-xs-6 col-md-4 project"
        data-groups="[&quot;illustration&quot;]"
      >
        <div className="img-bg-color primary">
          <Link to={this.props.link} className="project-link" />

          <img src={this.props.img} alt="" />

          <div className="project-hover-tools">
            <Link to={linkToSingle} className="view-btn">
              {singleIcon}
            </Link>
            <Link to={linkToLike} className="view-btn">
              {nutIcon}
            </Link>
          </div>

          <div className="project-details">
            <h5 className="project-title">{this.props.title}</h5>
            <p className="skill">{this.props.description}</p>
          </div>
        </div>
      </li>
    );
  }
}
function mapStateToProps(state) {
  return {
    nuts: state.nutSerie,
    isLogged: state.currentUser
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    onClickMovetoSingle: function(value) {
      dispatch({ type: "clickOnSingle", selectedSerie: value });
    },
    addFav: function(value) {
      dispatch({ type: "addToNuts", nutSerie: value });
    },
    delFav: function(value) {
      dispatch({ type: "delFromNuts", nutSerie: value });
    }
  };
}

var NouveautesSingleRedux = connect(mapStateToProps, mapDispatchToProps)(
  NouveautesSingle
);

export default NouveautesSingleRedux;
