import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class SerieSingleAccordion extends React.Component {
  constructor() {
    super();
  }

  render() {
    console.log(this.props.content);
    return (
      <div className="col-sm-6">
        <h4 className="sub-title">&nbsp;</h4>
        <div className="panel-group tabbed">
          <div className="panel">
            <div className="panel-heading">
              <a
                className="panel-title"
                data-toggle="collapse"
                href="components.html#panel5"
              >
                Season 1
              </a>
            </div>
            <div id="panel5" className="panel-collapse collapse in">
              <div className="panel-body text-gray">
                <ul>
                  <li>episode 1</li>
                  <li>episode 2</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  //console.log(state.searchRequest);
  return { selectedSerie: state.selectedSerie };
}

var SerieSingleAccordionRedux = connect(mapStateToProps, null)(
  SerieSingleAccordion
);

export default SerieSingleAccordionRedux;
