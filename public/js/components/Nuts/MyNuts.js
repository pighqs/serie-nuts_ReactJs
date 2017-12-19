import React from "react";
import { Link } from "react-router-dom";
import MyNutsSingle from "./MyNutsSingle";

import { connect } from "react-redux";


class MyNuts extends React.Component {
  constructor() {
    super();
    this.state = {
      returnSeriesFromAPI: ""
    };
}

  componentDidMount() {
    var that = this;
    var nutsToFetch = this.props.nuts.join();
    var requete =
      "https://api.betaseries.com/shows/display?key=d0c44a7cd167&id=" +
      nutsToFetch;
    console.log(requete);
    fetch(requete)
      .then(response => response.json())
      .then(function(datas) {
        if(that.props.nuts.length > 1) {
            that.setState({
              returnSeriesFromAPI: datas.shows
            });
        } else {
            that.setState({
                returnSeriesFromAPI: datas.show
              });
        }
      })
      .catch(error => console.log("erreur fetch MyNuts !!!" + error));
    
  }

  render() {
    var NutList = [];
    console.log(Array.isArray(this.state.returnSeriesFromAPI));
    if (this.state.returnSeriesFromAPI === undefined) {
        NutList = <div className="alert alert-nuts alert-dismissible">You Have no Nuts!</div>;
    } else {
        if(Array.isArray(this.state.returnSeriesFromAPI) === true) {
            var lengthStateDatas;
            this.state.returnSeriesFromAPI.length > 9
              ? (lengthStateDatas = 9)
              : (lengthStateDatas = this.state.returnSeriesFromAPI.length);
            for (var i = 0; i < lengthStateDatas; i++) {
              var poster;
              if (this.state.returnSeriesFromAPI[i].images.poster !== undefined) {
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
        } if (Array.isArray(this.state.returnSeriesFromAPI) === false){
              var poster;
              if (this.state.returnSeriesFromAPI.images.poster !== undefined) {
                poster = this.state.returnSeriesFromAPI.images.poster;
              } else {
                poster = "./images/default-poster.jpg";
              }
        
              NutList.push(
                <MyNutsSingle
                  title={this.state.returnSeriesFromAPI.title}
                  description={this.state.returnSeriesFromAPI.description}
                  img={poster}
                  link="/affichageseriesingle"
                  idserie={this.state.returnSeriesFromAPI.id}
                  key={i}
                />
              );
            
        }


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

function mapStateToProps(state) {
    return { nuts: state.nutSerie };
  }
  var MyNutsRedux = connect(mapStateToProps, null)(MyNuts);
export default MyNutsRedux;
