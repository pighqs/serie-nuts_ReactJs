import React from "react";
import { Link } from "react-router-dom";

import Contact from "./Contact";
import Navbar from "../Header/Navbar";
import Footer from "../Footer";

class AffichageContact extends React.Component {
  constructor() {
    super();
  }
  
  submit(values){
    var formData = new FormData();
    formData.append("mail", values.email);
    formData.append("marque", values.message);
    fetch("http://localhost:8080/contact", {
      method: "post",
      body: formData
    })
    .then(function(response) {
      return response.text();
    })
  }

  render() {
    return (
      <div>
            <Navbar />
            <Contact onSubmit={this.submit}/>
            <Footer />
      </div>
    );
  }
}

export default AffichageContact;
