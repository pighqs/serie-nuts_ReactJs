import React from "react";
import { Link } from "react-router-dom";
import MyNutsSingle from "./MyNutsSingle";

class MyNuts extends React.Component {
  constructor() {
    super();
    this.state = {
      returnSeriesFromAPI: ""
    };
  }

  componentDidMount() {
    var thisIsThis = this;
    var idSeries = [8847, 13384, 12742, 12709];
    var nutsToFetch = idSeries.join();
    var requete =
      "https://api.betaseries.com/shows/display?key=d0c44a7cd167&id=" +
      nutsToFetch;

    fetch(requete)
      .then(response => response.json())
      .then(function(datas) {
        console.log(datas);
        thisIsThis.setState({
          returnSeriesFromAPI: datas.shows
        });
      })
      .catch(error => console.log("erreur fetch NouveautesList !!!" + error));
  }

  render() {
    console.log(this.state);
    var NutList = [];
    var lengthStateDatas;
    this.state.returnSeriesFromAPI.length > 9
      ? (lengthStateDatas = 9)
      : (lengthStateDatas = this.state.returnSeriesFromAPI.length);
    for (var i = 0; i < lengthStateDatas; i++) {
      var poster;
      if (this.state.returnSeriesFromAPI[i].images.poster != undefined) {
        poster = this.state.returnSeriesFromAPI[i].images.poster;
      } else {
        poster = "./images/default-poster.jpg";
      }

      NutList.push(
        <MyNutsSingle
          title={this.state.returnSeriesFromAPI[i].title}
          description={this.state.returnSeriesFromAPI[i].description}
          img={poster}
          link="/affichageseriesingle"
          idserie={this.state.returnSeriesFromAPI[i].id}
          key={i}
        />
      );
    }
    return (
      <section id="portfolio">
        <div className="container">
          <ul className="row portfolio list-unstyled lightbox" id="grid">
            {NutList}

            <li className="col-xs-6 col-md-4 shuffle_sizer" />
          </ul>
        </div>
      </section>
    );
  }
}

export default MyNuts;
