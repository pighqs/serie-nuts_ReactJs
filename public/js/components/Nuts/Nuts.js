import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from "../Header/Navbar";
import Footer from "../Footer";
import MyNuts from "../Nuts/MyNuts";

class Nuts extends React.Component {

    constructor() {
        super();
    }

  render() {
    return (
    <div>
      <Navbar/>
      <MyNuts/>
      <Footer/>
    </div>
    );
  }
}

export default Nuts;