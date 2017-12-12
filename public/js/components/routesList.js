import React from 'react';
import { Route } from 'react-router-dom';

import Home from './Home';
import Other from './Other';


class RoutesList extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/other" component={Other} />
      </div>
    );
  }
}

export default RoutesList;
