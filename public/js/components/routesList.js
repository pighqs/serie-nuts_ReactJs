import React from 'react';
import { Route } from 'react-router-dom';

import Home from './Home';
import About from './About/About';
import AffichageSerieSingle from './Single/AffichageSerieSingle';
import SearchResults from './SearchResults/SearchResults';
import AffichageContact from "./Contact/AffichageContact";
import Nuts from "./Nuts/Nuts";



class RoutesList extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={Home} />
        <Route path="/my nuts" component={Nuts} />
        <Route path="/about" component={About} />
        <Route path="/affichageseriesingle" component={AffichageSerieSingle}/>
        <Route path="/searchresults" component={SearchResults}/>
        <Route path="/contact" component={AffichageContact}/>
      </div>
    );
  }
}

export default RoutesList;