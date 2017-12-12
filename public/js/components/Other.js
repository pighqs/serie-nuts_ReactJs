import React from 'react';
import { Link } from 'react-router-dom';

class Other extends React.Component {
    constructor() {
        super();
    }

  render() {
    return (
      <div>
        <h1>Other Page</h1>
        <h2><Link to="/">Home</Link></h2>
      </div>
    );
  }
}


export default Other;
