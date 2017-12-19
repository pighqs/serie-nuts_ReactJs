import React from "react";
import { Link } from "react-router-dom";

import Filter from "../Filter";
import NouveautesList from "./NouveautesList";


class Nouveautes extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <section id="portfolio">
        <div className="container">

        <Filter/>
        <NouveautesList/>

        </div>
      </section>
    );
  }
}

export default Nouveautes;
