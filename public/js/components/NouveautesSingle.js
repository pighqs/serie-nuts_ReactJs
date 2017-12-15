import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";

class NouveautesSingle extends React.Component {

    constructor() {
        super();
        this.onClickMovetoSingle = this.onClickMovetoSingle.bind(this);
    }

    onClickMovetoSingle() {
      console.log(this.props.idserie);
      // envoie du state à fonction onSearchClick du container redux
      this.props.onClickMovetoSingle(this.props.idserie);
    }


  render() {
    return (
        <li
          className="col-xs-6 col-md-4 project"
          data-groups="[&quot;illustration&quot;]"
        >
          <div className="img-bg-color primary">
            <Link to={this.props.link} className="project-link"></Link>

            <img src={this.props.img} alt="" />

            <div className="project-hover-tools" onClick={this.onClickMovetoSingle}>
              <Link to={this.props.link} className="view-btn">
                <i className="lnr lnr-eye" />
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
      console.log(value);
      dispatch({ type: "clickOnSingle", selectedSerie: value });
    }
  };
}

var NouveautesSingleRedux = connect(null, mapDispatchToProps)(NouveautesSingle);

export default NouveautesSingleRedux;
