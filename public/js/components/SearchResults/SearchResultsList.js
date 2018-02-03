import React from "react";
import { Link, Redirect } from "react-router-dom";
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
    let userSearch = this.props.userSearch.searchRequest;

    fetch(
      "https://api.betaseries.com/shows/list?key=d0c44a7cd167&id=8847&order=followers&starting=" +
        userSearch
    )
      .then(response => response.json())
      .then(datas => {
        this.setState({
          returnSeriesFromAPI: datas.shows
        });
      })
      .catch(error =>
        console.log("erreur fetch SearchResultsList !!!" + error)
      );

    // fetch server -> DB retourne favoris
    if (
      this.props.isLogged != undefined &&
      this.props.isLogged != null &&
      this.props.isLogged != ""
    ) {
      let userNuts = new FormData();
      userNuts.append("user_id", this.props.isLogged);
      fetch("/findnuts", {
        method: "post",
        body: userNuts
      })
        .then(response => response.json())
        .then(nuts => {
          this.setState({
            favsFromDB: nuts
          });
        })
        .catch(error =>
          console.log("erreur fetch findnuts nouveautesList" + error)
        );
    }
  }

  render() {
    if (!this.props.userSearch.searchRequest) {
      return <Redirect to="/" />;
    } else {
      let searchResults = [];
      let lengthStateDatas;
      let favs = this.state.favsFromDB;
      let poster;

      this.state.returnSeriesFromAPI.length > 30
        ? (lengthStateDatas = 30)
        : (lengthStateDatas = this.state.returnSeriesFromAPI.length);

      for (let i = 0; i < lengthStateDatas; i++) {
        let isFav;
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
            key={i}
            favsFromDB={this.state.favsFromDB}
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
}

const mapStateToProps = state => {
  return { userSearch: state.searchRequest, isLogged: state.currentUser };
};

const SearchResultsListRedux = connect(mapStateToProps, null)(
  SearchResultsList
);

export default SearchResultsListRedux;
