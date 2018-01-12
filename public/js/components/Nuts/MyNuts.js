import React from "react";
import { Link } from "react-router-dom";
import MyNutsSingle from "./MyNutsSingle";

import { connect } from "react-redux";

class MyNuts extends React.Component {
  constructor() {
    super();
    this.state = {
      favoriteShowsData: []
    };
  }

  
  componentDidMount() {
    var that = this;
    var userNuts = new FormData();
    userNuts.append("user_id", this.props.isLogged);
    
    if (this.props.nuts && this.props.nuts.length > 0) {
      
      var nutsToFetch = that.props.nuts.join(); // transforme tableau en chaine de caracteres
      var requete =
      "https://api.betaseries.com/shows/display?key=d0c44a7cd167&id=" +
      nutsToFetch;
      // fetch series from betaseries (uniquement ids);
      fetch(requete)
      .then(response => response.json())
      .then(function(data) {
        that.setState({
          favoriteShowsData: data.show ? [data.show] : data.shows
        });
      })
      .catch(error => console.log("erreur fetch MyNuts !!!" + error));
    }
  }
  
  componentWillReceiveProps(nextProps) {
    var that = this;
    let newFavsMinusDel = nextProps.nuts.join();
    var requete =
            "https://api.betaseries.com/shows/display?key=d0c44a7cd167&id=" +
            newFavsMinusDel;
            fetch(requete)
            .then(response => response.json())
            .then(function(data) {
              that.setState({
                favoriteShowsData: data.show ? [data.show] : data.shows
              });
            })
            .catch(error => console.log("erreur fetch MyNuts !!!" + error));
  }


  render() {
    console.log(this.state.favoriteShowsData);

    // si favoriteShowsData est vide
    if (
      !this.state.favoriteShowsData ||
      this.state.favoriteShowsData.length == 0
    ) {
      return (
        <div className="alert alert-nuts alert-dismissible">
          You Have no Nuts!
        </div>
      );
    } else {
      return (
        <section id="portfolio">
          <div className="container">
            <ul className="row portfolio list-unstyled lightbox" id="grid">
              {this.state.favoriteShowsData.map((favoriteShow, index) => (
                <MyNutsSingle
                  title={favoriteShow.title}
                  description={favoriteShow.description}
                  img={
                    favoriteShow.images.poster || "./images/default-poster.jpg"
                  }
                  link="/affichageseriesingle"
                  idserie={favoriteShow.id}
                  key={index}
                  favsFromDB ={this.state.favoriteShowsData}
                />
              ))}
              <li className="col-xs-6 col-md-4 shuffle_sizer" />
            </ul>
          </div>
        </section>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    nuts: state.nutSerie,
    isLogged: state.currentUser,
  };
}

var MyNutsRedux = connect(mapStateToProps, null)(MyNuts);
export default MyNutsRedux;
