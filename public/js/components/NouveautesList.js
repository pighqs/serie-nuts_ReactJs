import React from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

import NouveautesSingle from "./NouveautesSingle";

class NouveautesList extends React.Component {
  constructor() {
    super();
    this.state = {
      returnSeriesFromAPI: []
    };
  }

  componentDidMount() {
    var thisIsThis = this;
    fetch(
      "https://api.betaseries.com/shows/list?key=d0c44a7cd167&order=followers&limit=60"
    )
      .then(response => response.json())
      .then(function(datas) {
        thisIsThis.setState({
          returnSeriesFromAPI: datas.shows
        });
      })
      .catch(error => console.log("erreur fetch NouveautesList !!!" + error));
  }

  render() {
    var filter = this.props.activeFilter.activeFilter;

    var newSeries = [];
    var lengthStateDatas;

    this.state.returnSeriesFromAPI.length > 15
      ? (lengthStateDatas = 15)
      : (lengthStateDatas = this.state.returnSeriesFromAPI.length);

    // si le filtre "all est selectionné" (par défaut) :
    if (filter === "all") {
      for (var i = 0; i < lengthStateDatas; i++) {
        var poster;
        if (this.state.returnSeriesFromAPI[i].images.poster != undefined) {
          poster = this.state.returnSeriesFromAPI[i].images.poster;
        } else {
          poster = "./images/default-poster.jpg";
        }

        newSeries.push(
          <NouveautesSingle
            title={this.state.returnSeriesFromAPI[i].title}
            description={this.state.returnSeriesFromAPI[i].description}
            img={poster}
            link = "/affichageseriesingle"
            idserie = {this.state.returnSeriesFromAPI[i].id}
            key = {i}
          />
        );
      }
      // si un filtre autre que "all est selectionné"  :
    } else {
      for (var i = 0; i < 30; i++) {
        var genres = this.state.returnSeriesFromAPI[i].genres.map(x =>
          x.toLowerCase()
        );
        if (genres.includes(filter)) {
            var poster;
            if (this.state.returnSeriesFromAPI[i].images.poster != undefined) {
              poster = this.state.returnSeriesFromAPI[i].images.poster;
            } else {
              poster = "./images/default-poster.jpg";
            }
            newSeries.push(
                <NouveautesSingle
                  title={this.state.returnSeriesFromAPI[i].title}
                  description={this.state.returnSeriesFromAPI[i].description}
                  img={poster}
                  link = "/affichageseriesingle"
                  idserie = {this.state.returnSeriesFromAPI[i].id}
                  key = {i}
                />
              );
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
  return { activeFilter: state.activeFilter };
}

var NouveautesListRedux = connect(mapStateToProps, null)(NouveautesList);

export default NouveautesListRedux;
