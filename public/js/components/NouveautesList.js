import React from "react";
import { Link } from "react-router-dom";

import NouveautesSingle from "./NouveautesSingle";

class NouveautesList extends React.Component {
  constructor() {
    super();
  }

  render() {
    var newSeries = [];
    var returnSeriesFromAPI = [ 
        { title: "Title1", desc: "Description1", img: "images/project1.jpg", link: "/" },
        { title: "Title2", desc: "Description2", img: "images/project2.jpg", link: "/" },
        { title: "Title3", desc: "Description3", img: "images/project3.jpg", link: "/" },
        { title: "Title4", desc: "Description4", img: "images/project4.jpg", link: "/" },
        { title: "Title5", desc: "Description5", img: "images/project5.jpg", link: "/" },
        { title: "Title6", desc: "Description6", img: "images/project6.jpg", link: "/" }
        
    ];

    for (var i = 0; i < returnSeriesFromAPI.length; i++) {
        newSeries.push(
            <NouveautesSingle 
                title = { returnSeriesFromAPI[i].title }
                description = { returnSeriesFromAPI[i].desc }
                img = { returnSeriesFromAPI[i].img }
                link = { returnSeriesFromAPI[i].link }
            />
        );
    }

    return (
      <ul className="row portfolio list-unstyled lightbox" id="grid">

        {newSeries}

        <li className="col-xs-6 col-md-4 shuffle_sizer" />
      </ul>
    );
  }
}

export default NouveautesList;
