import React from "react";
import { Link } from "react-router-dom";

class SerieSingle extends React.Component {
  constructor() {
    super();
    this.state = {
      returnSeriesFromAPI: {}
    };
  }

  componentDidMount() {
    var thisIsThis = this;
    fetch("https://api.betaseries.com/shows/display?key=d0c44a7cd167&id=1161")
      .then(response => response.json())
      .then(function(datas) {
        console.log(datas);
        thisIsThis.setState({
          returnSeriesFromAPI: datas.show
        });
      })
      .catch(error => console.log("erreur fetch NouveautesList !!!" + error));
  }

  render() {
    if (this.state.returnSeriesFromAPI.seasons_details != undefined){
           var myseasons = this.state.returnSeriesFromAPI.seasons_details.map(x => <li>{x.number}</li>);
  }

    var categs = this.state.returnSeriesFromAPI.genres;
    if (categs != undefined) {
      var categs = categs.join(" - ");
      var urlstreaming = `https://bmovies.to/search?keyword=${
        this.state.returnSeriesFromAPI.title
      }`;
    }
    return (
      <div id="page-content" className="container">
        <section id="project">
          <div className="row">
            <div className="col-sm-7">
              <div className="project-content-area">
                <img
                  src="https://www.betaseries.com/images/fonds/show/1161_1212974.jpg"
                  alt=""
                  className="space-bottom-30"
                />
                <h4>Overview</h4>
                <p>{this.state.returnSeriesFromAPI.description}</p>
                <br />
                <br />
                <h4>
                  Total Seasons : {this.state.returnSeriesFromAPI.seasons}{" "}
                </h4>
                <ul>
                <li>{myseasons}</li>
                </ul>
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
                        Provider: {this.state.returnSeriesFromAPI.network}
                      </span>
                    </p>
                  </div>
                  <div className="info">
                    <p>
                      <i className="lnr lnr-star" />
                      <span>Category: {categs}</span>
                    </p>
                  </div>
                  <div className="info">
                    <p>
                      <i className="lnr lnr-calendar-full" />
                      <span>
                        First airtime: {this.state.returnSeriesFromAPI.creation}
                      </span>
                    </p>
                  </div>
                  <div className="info">
                    <p>
                      <i className="lnr lnr-map" />
                      <span>
                        Status: {this.state.returnSeriesFromAPI.status}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="info-buttons">
                  <a href={urlstreaming} className="btn btn-primary-filled">
                    <i className="lnr lnr-eye" />
                    <span> Watch Now</span>
                  </a>
                  <br />
                  <span>(Click droit + ouvrir en navigation privée)</span>
                </div>
              </div>
            </div>
          </div>
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

export default SerieSingle;
