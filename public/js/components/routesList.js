import React from 'react';
import { Route } from 'react-router-dom';

import Home from './Home';
import About from './About';


class RoutesList extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
      </div>
    );
  }
}

export default RoutesList;
