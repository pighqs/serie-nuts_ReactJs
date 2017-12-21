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
    // verifie qu'il y ai au moins 1 item dans le store avant de faire requete
    if (this.props.nuts.length) {
      var that = this;
      var nutsToFetch = this.props.nuts.join(); // transforme tableau en chaine de caracteres
      var requete =
        "https://api.betaseries.com/shows/display?key=d0c44a7cd167&id=" +
        nutsToFetch;
      fetch(requete)
        .then(response => response.json())
        .then(function(data) {
          that.setState({
            // vérifie type de réponse serveur
            favoriteShowsData: data.show ? [data.show] : data.shows
          });
        })
        .catch(error => console.log("erreur fetch MyNuts !!!" + error));
    }
  }

  render() {
    // si favoriteShowsData est vide
    if (!this.state.favoriteShowsData || !this.state.favoriteShowsData.length) {
      <div className="alert alert-nuts alert-dismissible">
        You Have no Nuts!
      </div>;
    }
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
              />
            ))}
            <li className="col-xs-6 col-md-4 shuffle_sizer" />
          </ul>
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return { nuts: state.nutSerie };
}

var MyNutsRedux = connect(mapStateToProps, null)(MyNuts);
export default MyNutsRedux;