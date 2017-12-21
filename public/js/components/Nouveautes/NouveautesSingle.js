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
      nutsFromDB: []
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

    fetch("/addfav", {
      method: "post",
      body: nut
    })
      .then(response => response.json())
      .then(function(datasFromBack) {
        //console.log(datasFromBack);
      });
  }

  delFav() {
    var that = this;
    this.props.delFav(this.props.idserie);

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

  // componentDidMount() {
  //   var that = this;
  //   fetch("/findnuts")
  //     .then(response => response.json())
  //     .then(function(nuts) {
  //       that.setState({
  //         nutsFromDB: nuts
  //       });
  //     })
  //     .catch(error => console.log("erreur fetch findnuts" + error));
  // }

  render() {
    var nutIcon;
    console.log(this.props.favIcon);
    if (this.props.favIcon == true ) {
      console.log("this.props.isFav est true");
      nutIcon = <i className="lnr lnr-poop" onClick={this.delFav} />
    } else {
      nutIcon = <i className="lnr lnr-heart" onClick={this.addFav} />
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
            <Link to={this.props.link} className="view-btn">
              <i className="lnr lnr-eye" onClick={this.onClickMovetoSingle} />
            </Link>
            <Link to="/" className="view-btn">
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
  return { nuts: state.nutSerie };
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

var NouveautesSingleRedux = connect(mapStateToProps, mapDispatchToProps)(NouveautesSingle);

export default NouveautesSingleRedux;
