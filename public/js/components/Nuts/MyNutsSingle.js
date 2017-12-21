import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class MyNutsSingle extends React.Component {
  constructor() {
    super();
    this.onClickMovetoSingle = this.onClickMovetoSingle.bind(this);
    this.delFav = this.delFav.bind(this);
  }

  onClickMovetoSingle() {
    // envoie du state à fonction onSearchClick du container redux
    this.props.onClickMovetoSingle(this.props.idserie);
  }

  delFav() {
    var that = this;

    var nut = new FormData();
    nut.append("nut_id", this.props.idserie);

    fetch("/delfav", {
      method: "post",
      body: nut
    })
      .then(response => response.json())
      .then(function(datasFromBack) {
        //console.log(datasFromBack);
      });
  }

  render() {
    return (
      <li
        className="col-xs-6 col-md-4 project"
        data-groups="[&quot;illustration&quot;]"
      >
        <div className="img-bg-color primary">
          <Link to={this.props.link} className="project-link" />

          <img src={this.props.img} alt="" />

          <div className="project-hover-tools">
            <Link to={this.props.link} className="view-btn">
              <i className="lnr lnr-eye" onClick={this.onClickMovetoSingle} />
            </Link>
            <Link to="/my nuts" className="view-btn">
              <i className="lnr lnr-poop" onClick={this.delFav} />
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

function mapDispatchToProps(dispatch, props) {
  return {
    onClickMovetoSingle: function(value) {
      dispatch({ type: "clickOnSingle", selectedSerie: value });
    }
  };
}

var MyNutsSingleRedux = connect(null, mapDispatchToProps)(MyNutsSingle);

export default MyNutsSingleRedux;
