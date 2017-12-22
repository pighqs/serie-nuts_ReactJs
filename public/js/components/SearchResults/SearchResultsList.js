import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import SearchResultsSingle from "./SearchResultsSingle";

class SearchResultsList extends React.Component {
  constructor() {
    super();
    this.state = {
      returnSeriesFromAPI: [],
      favsFromDB: []
    };
  }

  componentDidMount() {
    var that = this;
    var limitResults = 30;
    var userSearch = this.props.userSearch.searchRequest;

    fetch(
      "https://api.betaseries.com/shows/list?key=d0c44a7cd167&id=8847&order=followers&starting=" +
        userSearch
    )
      .then(response => response.json())
      .then(function(datas) {
        that.setState({
          returnSeriesFromAPI: datas.shows
        });
      })
      .catch(error =>
        console.log("erreur fetch SearchResultsList !!!" + error)
      );

    // fetch server -> DB retourne favoris
    if (
      that.props.isLogged != undefined &&
      that.props.isLogged != null &&
      that.props.isLogged != ""
    ) {
      var userNuts = new FormData();
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
    var searchResults = [];
    var lengthStateDatas;
    var favs = this.state.favsFromDB;
    var poster;

    this.state.returnSeriesFromAPI.length > 30
      ? (lengthStateDatas = 30)
      : (lengthStateDatas = this.state.returnSeriesFromAPI.length);

    for (var i = 0; i < lengthStateDatas; i++) {
      var isFav;
      poster =
        this.state.returnSeriesFromAPI[i].images.poster ||
        "./images/default-poster.jpg";
      if (favs.includes(this.state.returnSeriesFromAPI[i].id)) {
        isFav = true;
      } else {
        isFav = false;
      }

      searchResults.push(
        <SearchResultsSingle
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

    return (
      <section id="portfolio">
        <div className="container">
          <ul className="row portfolio list-unstyled lightbox" id="grid">
            {searchResults}
            <li className="col-xs-6 col-md-4 shuffle_sizer" />
          </ul>
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return { userSearch: state.searchRequest, isLogged: state.currentUser };
}

var SearchResultsListRedux = connect(mapStateToProps, null)(SearchResultsList);

export default SearchResultsListRedux;
