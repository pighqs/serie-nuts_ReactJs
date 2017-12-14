import React from "react";
import { Link } from "react-router-dom";

import Filter from "./Filter";
import NouveautesList from "./NouveautesList";
import SearchResultsList from "./SearchResultsList";




class Nouveautes extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <section id="portfolio">
        <div className="container">

        <Filter/>
        {/* <NouveautesList/> */}
        <SearchResultsList/>


        </div>
      </section>
    );
  }
}

export default Nouveautes;
