import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";

class SearchResultsSingle extends React.Component {

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
      // envoie du state à fonction onSearchClick du container redux
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

    componentDidMount() {
      var that = this;
      fetch("/findnuts")
        .then(response => response.json())
        .then(function(nuts) {
          that.setState({
            nutsFromDB: nuts
          });
        })
        .catch(error => console.log("erreur fetch findnuts" + error));
    }

  render() {
    var nutIcon = <i className="lnr lnr-heart" onClick={this.addFav} />;
    this.state.nutsFromDB.map(
      function(nutFromDB, i) {
        if (nutFromDB === this.props.idserie) {
          nutIcon = <i className="lnr lnr-poop" onClick={this.delFav} />;
        } else {
          nutIcon = <i className="lnr lnr-heart" onClick={this.addFav} />;
        }
      }.bind(this)
    );

    return (
        <li
          className="col-xs-6 col-md-4 project"
          data-groups="[&quot;illustration&quot;]"
        >
          <div className="img-bg-color primary">
            <Link to={this.props.link} className="project-link"></Link>

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

function mapDispatchToProps(dispatch, props) {
  return {
    onClickMovetoSingle: function(value) {
      dispatch({ type: "clickOnSingle", selectedSerie: value });
    },
    addFav: function(value) {
      dispatch({ type: "addToNuts", nutSerie: value });
    }
  };
}


var SearchResultsSingleRedux = connect(null, mapDispatchToProps)(SearchResultsSingle);

export default SearchResultsSingleRedux;
