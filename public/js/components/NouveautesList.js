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
      "https://api.betaseries.com/shows/list?key=d0c44a7cd167&order=followers&limit=30"
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
    console.log(filter);

    var newSeries = [];
    var lengthStateDatas;

    this.state.returnSeriesFromAPI.length > 30
      ? (lengthStateDatas = 30)
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
            link="/"
            key={this.state.returnSeriesFromAPI[i].id}
          />
        );
      }
    } else {
      for (var i = 0; i < 12; i++) {
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
                  link="/"
                  key={this.state.returnSeriesFromAPI[i].id}
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
