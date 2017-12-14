import React from 'react';
import { Link } from 'react-router-dom';

import Navbar from "./Navbar";
import Footer from "./Footer";
import SerieSingle from "./SerieSingle";


class AffichageSerieSingle extends React.Component {

    constructor() {
        super();
    }

  render() {
    return (
    <div>
      <Navbar/>
      <SerieSingle/>
      <Footer/>
    </div>
    );
  }
}

export default AffichageSerieSingle;
