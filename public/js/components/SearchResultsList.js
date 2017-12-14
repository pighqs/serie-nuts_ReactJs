import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import SearchResultsSingle from "./SearchResultsSingle";

class SearchResultsList extends React.Component {
  constructor() {
    super();
    this.state = {
      returnSeriesFromAPI: []
    };
  }

  componentDidMount() {
    var thisIsThis = this;
    var limitResults = 30;
    var userSearch = this.props.userSearch.searchRequest;
    console.log(userSearch);
    fetch(
      "https://api.betaseries.com/shows/list?key=d0c44a7cd167&id=8847&order=followers&starting=" +
        userSearch
    )
      .then(response => response.json())
      .then(function(datas) {
        thisIsThis.setState({
          returnSeriesFromAPI: datas.shows
        });
      })
      .catch(error =>
        console.log("erreur fetch SearchResultsList !!!" + error)
      );
  }

  //   componentWillReceiveProps(newProps) {
  //     var thisIsThis = this;
  //     var limitResults = 30;
  //     var userSearch = newProps.userSearch.searchRequest;
  //     console.log(userSearch);
  //     fetch(
  //       "https://api.betaseries.com/shows/list?key=d0c44a7cd167&id=8847&starting="+userSearch
  //     )
  //       .then(response => response.json())
  //       .then(function(datas) {
  //         thisIsThis.setState({
  //           returnSeriesFromAPI: datas.shows
  //         });
  //       })
  //       .catch(error =>
  //         console.log("erreur fetch SearchResultsList !!!" + error)
  //       );
  //   }

  render() {
    var searchResults = [];
    var lengthStateDatas;
    this.state.returnSeriesFromAPI.length > 9
      ? (lengthStateDatas = 9)
      : (lengthStateDatas = this.state.returnSeriesFromAPI.length);
    for (var i = 0; i < lengthStateDatas; i++) {

        var poster;
        if (this.state.returnSeriesFromAPI[i].images.poster != undefined) {
            poster = this.state.returnSeriesFromAPI[i].images.poster
        } else {
            poster= "./images/default-poster.jpg";
        }
        
      searchResults.push(
        <SearchResultsSingle
          title={this.state.returnSeriesFromAPI[i].title}
          description={this.state.returnSeriesFromAPI[i].description}
          img={poster}
          link="/"
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
  //console.log(state.searchRequest);
  return { userSearch: state.searchRequest };
}

var SearchResultsListRedux = connect(mapStateToProps, null)(SearchResultsList);

export default SearchResultsListRedux;
