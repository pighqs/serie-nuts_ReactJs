import React from "react";
import { Link } from "react-router-dom";

import NouveautesSingle from "./NouveautesSingle";

class NouveautesList extends React.Component {
  constructor() {
    super();
    this.state = {
        returnSeriesFromAPI: []
    }
  }

  componentDidMount() {
      var thisIsThis = this;
      var limitResults = 30;
      fetch("https://api.betaseries.com/shows/list?key=d0c44a7cd167&order=followers&limit="+limitResults)
        .then(response => response.json())
        .then(function(datas) {
            thisIsThis.setState({
                returnSeriesFromAPI: datas.shows
            });
        })
        .catch(error => console.log("erreur fetch NouveautesList !!!" + error));
  }

  render() {
    var newSeries = [];
    var lengthStateDatas;
    (this.state.returnSeriesFromAPI.length > 9)? lengthStateDatas = 9 : lengthStateDatas = this.state.returnSeriesFromAPI.length;
    for (var i = 0; i < lengthStateDatas; i++) {
        var poster;
        if (this.state.returnSeriesFromAPI[i].images.poster != undefined) {
            poster = this.state.returnSeriesFromAPI[i].images.poster
        } else {
            poster= "./images/default-poster.jpg";
        }

        newSeries.push(
            <NouveautesSingle 
                title = { this.state.returnSeriesFromAPI[i].title }
                description = { this.state.returnSeriesFromAPI[i].description }
                img = {poster}
                link = "/"
                key = {i}
            />
        );
    }

    return (
      <ul className="row portfolio list-unstyled lightbox" id="grid">

        {newSeries}

        <li className="col-xs-6 col-md-4 shuffle_sizer" />
      </ul>
    );
  }
}

export default NouveautesList;
