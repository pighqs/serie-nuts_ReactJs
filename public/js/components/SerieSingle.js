import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import SerieSeasons from "./SerieSeasons";

class SerieSingle extends React.Component {
  constructor() {
    super();
    this.state = {
      returnSeriesFromAPI: {}
    };
  }

  componentDidMount() {
    var thisIsThis = this;
    fetch(
      `https://api.betaseries.com/shows/display?key=d0c44a7cd167&id=${
        thisIsThis.props.selectedSerie
      }`
    )
      .then(response => response.json())
      .then(function(datas) {
        thisIsThis.setState({
          returnSeriesFromAPI: datas.show
        });
      })
      .catch(error => console.log("erreur fetch NouveautesList !!!" + error));
  }

  render() {
    var categs = this.state.returnSeriesFromAPI.genres;
    if (categs != undefined) {
      var categs = categs.join(" - ");
      var urlstreaming = `https://bmovies.to/search?keyword=${
        this.state.returnSeriesFromAPI.title
      }`;
    }

    if (this.state.returnSeriesFromAPI.images) {
      var imagesingle = this.state.returnSeriesFromAPI.images.show;
    } else {
      var imagesingle = "./images/default-poster-white.jpg";
    }
      console.log(this.state.returnSeriesFromAPI.seasons_details);
    return (
      <div id="page-content" className="container">
        <section id="project">
          <div className="row">
            <div className="col-sm-7">
              <div className="project-content-area">
                <img src={imagesingle} alt="" className="space-bottom-30" />
                <h4>Overview</h4>
                <p>{this.state.returnSeriesFromAPI.description}</p>
                <br />
                <br />
                <h4>
                  Total Seasons : {this.state.returnSeriesFromAPI.seasons}{" "}
                </h4>
              </div>
            </div>

            <div className="col-sm-5 project-sidebar right">
              <div className="section-description light">
                <h2>{this.state.returnSeriesFromAPI.title}</h2>
                <p />
                <h4 className="space-top-30">Details</h4>
                <div className="project-info">
                  <div className="info">
                    <p>
                      <i className="lnr lnr-user" />
                      <span>
                        <strong>Provider:</strong>{" "}
                        {this.state.returnSeriesFromAPI.network}
                      </span>
                    </p>
                  </div>
                  <div className="info">
                    <p>
                      <i className="lnr lnr-star" />
                      <span> <strong>Category:</strong> {categs}</span>
                    </p>
                  </div>
                  <div className="info">
                    <p>
                      <i className="lnr lnr-calendar-full" />
                      <span>
                        <strong>First airtime:</strong> {this.state.returnSeriesFromAPI.creation}
                      </span>
                    </p>
                  </div>
                  <div className="info">
                    <p>
                      <i className="lnr lnr-map" />
                      <span>
                        <strong>Status:</strong> {this.state.returnSeriesFromAPI.status}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="info-buttons">
                  <a href={urlstreaming} target="_blank" className="btn btn-primary-filled">
                    <i className="lnr lnr-eye" />
                    <span> Watch Now</span>
                  </a>
                  <br />
                  <span>(Click droit + ouvrir en navigation privée)</span>
                </div>
              </div>
            </div>
          </div>
          <SerieSeasons
          content={this.state.returnSeriesFromAPI.seasons_details}
          />
        </section>
        {/* 
  Partie qui permet de naviguer entre les singles (difficile à appliquer, à voir) */}
        {/*       <div className="pagination">
          <a href="single-project-3.html" className="btn btn-direction btn-default-filled"><i className="fa fa-long-arrow-left"></i><span>Previous Project</span></a>
          <a href="single-project-2.html" className="btn btn-direction btn-default-filled pull-right"><span>Next Project</span><i className="fa fa-long-arrow-right"></i></a>
      </div> */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  //console.log(state.searchRequest);
  return { selectedSerie: state.selectedSerie };
}

var SerieSingleRedux = connect(mapStateToProps, null)(SerieSingle);

export default SerieSingleRedux;
