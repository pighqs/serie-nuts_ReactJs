import React from "react";

class Team extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <section id="team">
        <h2 className="text-center space-top-2x">THE TEAM</h2>
        <p className="text-center space-bottom-2x">
          The amazing team of hard-working developers.
        </p>
        <div className="row">
          <div className="col-sm-6">
            <div className="team block text-center">
              <img src="images/team_RG.jpg" alt="" />
              <div className="team-info-box">
                <h6>ALLAN PROST</h6>
                <p className="team-role">Project Manager</p>
                <p className="social text-center">
                <a target="_blank" href="https://www.linkdein.com"><i className="fa fa-linkedin"></i></a>
                <a target="_blank" href="https://www.twitter.com"><i className="fa fa-twitter"></i></a>
                <a target="_blank" href="https://www.instagram.com"><i className="fa fa-instagram"></i></a>
                </p>
              </div>
            </div>
          </div>

          <div className="col-sm-6">
            <div className="team block text-center">
              <img src="images/team_AF.jpg" alt="" />
              <div className="team-info-box">
                <h6>PEGGY HUYNH-QUAN-SUU</h6>
                <p className="team-role">FullStack Developper</p>
                <p className="social text-center">
                  <a target="_blank" href="https://www.linkedin.com/in/peggyhqs/"><i className="fa fa-linkedin"></i></a>
                  <a target="_blank" href="https://youtu.be/9_G637sWOJk"><i className="fa fa-twitter"></i></a>
                  <a target="_blank" href="https://www.instagram.com"><i className="fa fa-instagram"></i></a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Team;
