import React from "react";
import { Link, Redirect } from "react-router-dom";

import Contact from "./Contact";
import Navbar from "./Navbar";
import Footer from "./Footer";

class AffichageContact extends React.Component {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
    this.state = { submitted: false };
  }

  submit(values) {
    var ctx = this;
    console.log(values);
    var formData = new FormData();
    formData.append("email", values.email);
    formData.append("message", values.message);
    formData.append("fullname", values.fullname);
    fetch("http://localhost:8080/contact", {
      method: "post",
      body: formData
    })
      .then(response => response.json())
      .then(function(datas) {
        ctx.setState({
          submitted: true
        });
      });
  }

  render() {
    if (this.state.submitted === true) {
      return <Redirect to="/" />;
    } 
    else {
      return (
        <div>
          <Navbar />
          <Contact onSubmit={this.submit} />
          <Footer />
        </div>
      );
    }
  }
}

export default AffichageContact;
