import React from "react";

class AboutFacts extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
        <section id="facts">
        <div className="row">
          <div className="col-sm-4 text-center">
            <i className="fact-icon lnr lnr-users" />
            <h3
              className="timer"
              id="clients"
              data-to="3745"
              data-speed="1500"
            >
              0
            </h3>
            <h5 className="fact-title">CLIENTS</h5>
          </div>

          <div className="col-sm-4 text-center">
            <i className="fact-icon lnr lnr-briefcase" />
            <h3
              className="timer"
              id="projects"
              data-to="5402"
              data-speed="2000"
            >
              1
            </h3>
            <h5 className="fact-title">PROJECTS COMPLETED</h5>
          </div>

          <div className="col-sm-4 text-center">
            <i className="fact-icon lnr lnr-coffee-cup" />
            <h3
              className="timer"
              id="coffee"
              data-to="675"
              data-speed="2500"
            >
              675
            </h3>
            <h5 className="fact-title">CUPS OF COFFEE</h5>
          </div>
        </div>
      </section>
    );
  }
}

export default AboutFacts;
