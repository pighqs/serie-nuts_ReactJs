import React from "react";
import { Link } from "react-router-dom";
import MyNutsSingle from "./MyNutsSingle";

import { connect } from "react-redux";

class MyNuts extends React.Component {
  constructor() {
    super();
    this.state = {
      favoriteShowsData: []
    };
  }

  
  componentDidMount() {
    console.log("this.props.isLogged :", this.props.isLogged);
    let userNuts = new FormData();
    userNuts.append("user_id", this.props.isLogged);
    
    if (this.props.nuts && this.props.nuts.length > 0) {
      
      let nutsToFetch = this.props.nuts.join(); // transforme tableau en chaine de caracteres
      let requete =
      "https://api.betaseries.com/shows/display?key=d0c44a7cd167&id=" +
      nutsToFetch;
      // fetch series from betaseries (uniquement ids);
      fetch(requete)
      .then(response => response.json())
      .then((data) => {
        this.setState({
          favoriteShowsData: data.show ? [data.show] : data.shows
        });
      })
      .catch(error => console.log("erreur fetch MyNuts !!!" + error));
    }
  }
  
  componentWillReceiveProps(nextProps) {
    let newFavsMinusDel = nextProps.nuts.join();
    let requete =
            "https://api.betaseries.com/shows/display?key=d0c44a7cd167&id=" +
            newFavsMinusDel;
            fetch(requete)
            .then(response => response.json())
            .then((data) => {
              this.setState({
                favoriteShowsData: data.show ? [data.show] : data.shows
              });
            })
            .catch(error => console.log("erreur fetch MyNuts !!!" + error));
  }


  render() {
    console.log(this.state.favoriteShowsData);

    // si favoriteShowsData est vide
    if (
      !this.state.favoriteShowsData ||
      this.state.favoriteShowsData.length == 0
    ) {
      return (
        <div className="alert alert-nuts alert-dismissible">
          You Have no Nuts!
        </div>
      );
    } else {
      return (
        <section id="portfolio">
          <div className="container">
            <ul className="row portfolio list-unstyled lightbox" id="grid">
              {this.state.favoriteShowsData.map((favoriteShow, index) => (
                <MyNutsSingle
                  title={favoriteShow.title}
                  description={favoriteShow.description}
                  img={
                    favoriteShow.images.poster || "./images/default-poster.jpg"
                  }
                  link="/affichageseriesingle"
                  idserie={favoriteShow.id}
                  key={index}
                  favsFromDB ={this.state.favoriteShowsData}
                />
              ))}
              <li className="col-xs-6 col-md-4 shuffle_sizer" />
            </ul>
          </div>
        </section>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    nuts: state.nutSerie,
    isLogged: state.currentUser,
  };
}

const MyNutsRedux = connect(mapStateToProps, null)(MyNuts);
export default MyNutsRedux;
