import React from "react";
import { Link, Redirect } from "react-router-dom";
import Navbar from "../Header/Navbar";
import Footer from "../Footer";
import SignupLoginForm from "./SignupLoginForm";

class SignupLogin extends React.Component {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
    this.state = { islogged: false, currentUser: null, userError: false };
  }
  submit(values) {
    var ctx = this;
    var formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);
    fetch("http://localhost:8080/signup", {
      method: "post",
      body: formData
    })
      .then(response => response.json())
      .then(function(datas) {
        console.log(datas);
        if (datas === null) {
          ctx.setState({
            islogged: false,
            userError: true
          });
        } else {
          ctx.setState({
            islogged: true,
            currentUser: datas._id
          });
        }
      });
  }

  render() {
    if (this.state.islogged === true) {
      return <Redirect to="/" />;
    } else {
      return (
        <div>
          <Navbar />
          <SignupLoginForm buglog={this.state.userError} onSubmit={this.submit} />
          <Footer />
        </div>
      );
    }
  }
}

export default SignupLogin;
