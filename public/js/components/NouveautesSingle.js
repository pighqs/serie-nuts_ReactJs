import React from 'react';
import { Link } from 'react-router-dom';


class NouveautesSingle extends React.Component {

    constructor() {
        super();
    }

  render() {
    return (
        <li
          className="col-xs-6 col-md-4 project"
          data-groups="[&quot;illustration&quot;]"
        >
          <div className="img-bg-color primary">
            <Link to={this.props.link} className="project-link"></Link>

            <img src={this.props.img} alt="" />

            <div className="project-hover-tools">
              <Link to={this.props.link} className="view-btn">
                <i className="lnr lnr-eye" />
              </Link>

            </div>

            <div className="project-details">
              <h5 className="project-title">{this.props.title}</h5>
              <p className="skill">{this.props.description}</p>
            </div>
          </div>
        </li>
    );
  }
}

export default NouveautesSingle;
