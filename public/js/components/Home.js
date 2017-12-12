import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {

    constructor() {
        super();
    }

  render() {
    return (
      <div>
        <h1>Hello React Redux</h1>
        <h2><Link to="/other">Other Page Link</Link></h2>
        <h4>dependencies installed :</h4>

        <ul>
          <li>ejs</li>
          <li>express</li>
          <li>react</li>
          <li>react-dom</li>
          <li>react-redux</li>
          <li>react-router-dom</li>
          <li>redux</li>
          <li>babel-core</li>
          <li>babel-loader</li>
          <li>babel-preset-es2015</li>
          <li>babel-preset-react</li>
          <li>webpack</li>
        </ul>
      </div>
    );
  }
}

export default Home;
