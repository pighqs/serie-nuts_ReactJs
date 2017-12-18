import React from 'react';
import { Route } from 'react-router-dom';

import Home from './Home';
import About from './About';
import AffichageSerieSingle from './AffichageSerieSingle';
import SearchResults from './SearchResults';
import AffichageContact from "./AffichageContact";


class RoutesList extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/affichageseriesingle" component={AffichageSerieSingle}/>
        <Route path="/searchresults" component={SearchResults}/>
        <Route path="/contact" component={AffichageContact}/>
      </div>
    );
  }
}

export default RoutesList;
