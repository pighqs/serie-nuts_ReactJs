import React from "react";
import { Link } from "react-router-dom";

import Header from "../Header/Header";
import Footer from "../Footer";

import SearchResultsList from "./SearchResultsList";


class SearchResults extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
        <div>
        <Header/>
        <SearchResultsList/>
        <Footer/>
        </div>
    );
  }
}

export default SearchResults;
