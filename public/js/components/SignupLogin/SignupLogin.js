import React from "react";
import { Link, Redirect } from "react-router-dom";
import Navbar from "../Header/Navbar";
import Footer from "../Footer";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";

class SignupLogin extends React.Component {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
    this.submitlogin = this.submitlogin.bind(this);
    this.state = { islogged: false, currentUser: null, signupError: false, loginError : false };
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
            signupError: true
          });
        } else {
          ctx.setState({
            islogged: true,
            currentUser: datas._id
          });
        }
      });
  }

  submitlogin(values) {
    var ctx = this;
    var formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);
    fetch("http://localhost:8080/login", {
      method: "post",
      body: formData
    })
      .then(response => response.json())
      .then(function(datas) {
        if (datas === "ko") {
          ctx.setState({
            islogged: false,
            loginError: true
          });
        } else {
          ctx.setState({
            islogged: true,
            currentUser: datas
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
          <SignupForm
            buglog={this.state.signupError}
            onSubmit={this.submit}
          />
          <LoginForm
            buglog={this.state.loginError}
            onSubmit={this.submitlogin}
          />
          <Footer />
        </div>
      );
    }
  }
}

export default SignupLogin;
