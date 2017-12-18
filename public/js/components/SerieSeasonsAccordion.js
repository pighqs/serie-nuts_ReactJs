import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class SerieSeasonsAccordion extends React.Component {
  constructor() {
    super();
    this.state = { isOpen: false };
    this.toggleAccordion = this.toggleAccordion.bind(this);
    this.renderEpisodes = this.renderEpisodes.bind(this);
  }

  toggleAccordion() {
    this.setState({
      isOpen: this.state.isOpen ? false : true
    });
  }

  renderEpisodes(episodesNumber) {
    var episodes = [];
    for (var i = 1; i <= episodesNumber; i++) {
      episodes.push(<li>Episode {i}</li>);
    }
    return episodes;
  }

  render() {
    const { season } = this.props;
    return (
      <div key={season.number} className="panel">
        <div
          className="panel-heading"
          onClick={this.toggleAccordion}
          style={{ cursor: "pointer" }}
        >
          <a className="panel-title" data-toggle="collapse">
            Season : {season.number}
          </a>
        </div>
        <div id="panel5" className="panel-collapse collapse in">
          <div className="panel-body text-gray">
            {this.state.isOpen ? (
              <ul>{this.renderEpisodes(season.episodes)}</ul>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { selectedSerie: state.selectedSerie };
}

var SerieSeasonsAccordionRedux = connect(mapStateToProps, null)(
  SerieSeasonsAccordion
);

export default SerieSeasonsAccordionRedux;
