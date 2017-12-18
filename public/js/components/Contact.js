import React from 'react';
import { Link } from 'react-router-dom';

import Navbar from "./Navbar";
import Footer from "./Footer";


class Contact extends React.Component {

    constructor() {
        super();
    }

  render() {
    return (
        <div>
      <Navbar/>
      <Footer/>
      </div>
    );
  }
}

export default Contact;








