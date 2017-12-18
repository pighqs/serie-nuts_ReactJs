import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import SerieSeasonsAccordion from "./SerieSeasonsAccordion";

class SerieSeasons extends React.Component {
  constructor() {
    super();
    this.renderSeasons = this.renderSeasons.bind(this);
  }

  renderSeasons() {
    var seasons = this.props.content;
    if (this.props.content) {
      return seasons.map(season => <SerieSeasonsAccordion season={season} />);
    }
  }

  render() {
    console.log(this.props.content);

    return (
      <div className="col-sm-6">
        <h4 className="sub-title">&nbsp;</h4>
        <div className="panel-group tabbed">{this.renderSeasons()}</div>
      </div>
    );
  }
}

export default SerieSeasons;
