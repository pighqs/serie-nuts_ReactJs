import React from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

import NouveautesSingle from "./NouveautesSingle";

class NouveautesList extends React.Component {
  constructor() {
    super();
    this.state = {
      returnSeriesFromAPI: [],
      favsFromDB: []
    };
  }

  componentDidMount() {
    const that = this;
    // fetch series from betaseries (classés par nb followers);
    fetch(
      "https://api.betaseries.com/shows/list?key=d0c44a7cd167&order=followers&limit=90"
    )
      .then(response => response.json())
      .then(function(datas) {
        that.setState({
          returnSeriesFromAPI: datas.shows
        });
      })
      .catch(error => console.log("erreur fetch NouveautesList !!!" + error));

    // fetch server -> DB retourne favoris
    if (
      that.props.isLogged != undefined &&
      that.props.isLogged != null &&
      that.props.isLogged != ""
    ) {
      let userNuts = new FormData();
      userNuts.append("user_id", that.props.isLogged);
      fetch("/findnuts", {
        method: "post",
        body: userNuts
      })
        .then(response => response.json())
        .then(function(nuts) {
          that.setState({
            favsFromDB: nuts
          });
        })
        .catch(error =>
          console.log("erreur fetch findnuts nouveautesList" + error)
        );
    }
  }

  render() {
    let filter = this.props.activeFilter.activeFilter;
    let newSeries = [];
    let lengthStateDatas;
    let genres = "";
    let favs = this.state.favsFromDB;
    let poster;

    this.state.returnSeriesFromAPI.length > 30
      ? (lengthStateDatas = 30)
      : (lengthStateDatas = this.state.returnSeriesFromAPI.length);

    // si le filtre "all est selectionné" (par défaut) :
    if (filter === "all") {
      for (let i = 0; i < lengthStateDatas; i++) {
        var isFav;
        poster =
          this.state.returnSeriesFromAPI[i].images.poster ||
          "./images/default-poster.jpg";
        if (favs.includes(this.state.returnSeriesFromAPI[i].id)) {
          isFav = true;
        } else {
          isFav = false;
        }

        newSeries.push(
          <NouveautesSingle
            title={this.state.returnSeriesFromAPI[i].title}
            description={this.state.returnSeriesFromAPI[i].description}
            img={poster}
            link="/affichageseriesingle"
            idserie={this.state.returnSeriesFromAPI[i].id}
            favIcon={isFav}
            key={i}
          />
        );
      }
      // si un filtre autre que "all est selectionné"  :
    } else {
      let j = 0;
      for (let i = 0; i < this.state.returnSeriesFromAPI.length; i++) {
        if (j < 30) {
            let genres = this.state.returnSeriesFromAPI[i].genres.map(x =>
              x.toLowerCase()
            );
            if (genres.includes(filter)) {
              j++;
              poster =
                this.state.returnSeriesFromAPI[i].images.poster ||
                "./images/default-poster.jpg";
              if (favs.includes(this.state.returnSeriesFromAPI[i].id)) {
                isFav = true;
              }
              newSeries.push(
                <NouveautesSingle
                  title={this.state.returnSeriesFromAPI[i].title}
                  description={this.state.returnSeriesFromAPI[i].description}
                  img={poster}
                  link="/affichageseriesingle"
                  idserie={this.state.returnSeriesFromAPI[i].id}
                  favIcon={isFav}
                  key={i}
                />
              );
            }
          }

      }
      }
    

    return (
      <ul className="row portfolio list-unstyled lightbox" id="grid">
        {newSeries}
        <li className="col-xs-6 col-md-4 shuffle_sizer" />
      </ul>
    );
  }
}

function mapStateToProps(state) {
  return { activeFilter: state.activeFilter, isLogged: state.currentUser };
}

const NouveautesListRedux = connect(mapStateToProps, null)(NouveautesList);

export default NouveautesListRedux;
