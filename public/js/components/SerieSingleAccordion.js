import React from 'react';
import { Link } from 'react-router-dom';
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
                        <a className="panel-title collapsed" data-toggle="collapse" href="components.html#panel4">Season 1</a>
                    </div>
                    <div id="panel4" className="panel-collapse collapse">
                        <div className="panel-body text-gray">
                        Curabitur convallis nunc urna, sit amet pulvinar neque commodo in. Fusce vel ex sed nisi consequat molestie a quis massa. Maecenas vel dictum magna. Aenean non mauris accumsan massa efficitur molestie vel tristique nibh. Phasellus magna odio, feugiat ac leo eget placerat.
                        </div>
                    </div>
                    </div>
                </div>
                <div className="panel-group tabbed">
                    <div className="panel">
                    <div className="panel-heading">
                        <a className="panel-title" data-toggle="collapse" href="components.html#panel5">Season 2</a>
                    </div>
                    <div id="panel5" className="panel-collapse collapse in">
                        <div className="panel-body text-gray">
                        Curabitur convallis nunc urna, sit amet pulvinar neque commodo in. Fusce vel ex sed nisi consequat molestie a quis massa. Maecenas vel dictum magna. Aenean non mauris accumsan massa efficitur molestie vel tristique nibh. Phasellus magna odio, feugiat ac leo eget placerat.
                        </div>
                    </div>
                    </div>
                </div>
                <div className="panel-group tabbed">
                    <div className="panel">
                    <div className="panel-heading">
                        <a className="panel-title collapsed" data-toggle="collapse" href="components.html#panel6">Season 3</a>
                    </div>
                    <div id="panel6" className="panel-collapse collapse">
                        <div className="panel-body text-gray">
                        Curabitur convallis nunc urna, sit amet pulvinar neque commodo in. Fusce vel ex sed nisi consequat molestie a quis massa. Maecenas vel dictum magna. Aenean non mauris accumsan massa efficitur molestie vel tristique nibh. Phasellus magna odio, feugiat ac leo eget placerat.
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
  
  var SerieSingleAccordionRedux = connect(mapStateToProps, null)(SerieSingleAccordion);

export default SerieSingleAccordionRedux;