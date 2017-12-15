import React from 'react';
import { Link } from 'react-router-dom';


class Filter extends React.Component {

    constructor() {
        super();
    }

  render() {
    return (
        <ul className="portfolio-filter list-inline text-center">
            <li>
              <a href="index.html#" data-group="all" className="active">
                ALL
              </a>
            </li>
            <li>
              <a href="index.html#" data-group="graphic-design">
                ACTION
              </a>
            </li>
            <li>
              <a href="index.html#" data-group="branding">
                DRAMA
              </a>
            </li>
            <li>
              <a href="index.html#" data-group="logo-design">
                GIRLY
              </a>
            </li>
            <li>
              <a href="index.html#" data-group="illustration">
                HUMOR
              </a>
            </li>
          </ul>
    );
  }
}

export default Filter;
