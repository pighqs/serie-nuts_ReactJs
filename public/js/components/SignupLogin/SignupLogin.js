import React from "react";
import { Link, Redirect } from "react-router-dom";
import Navbar from "../Header/Navbar";
import Footer from "../Footer";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import { connect } from "react-redux";

class SignupLogin extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.submitlogin = this.submitlogin.bind(this);
    this.state = {
      currentUser: null,
      signupError: false,
      loginError: false
    };
  }

  submit(values) {
    var ctx = this;
    var formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);
    fetch("/signup", {
      method: "post",
      body: formData
    })
      .then(response => response.json())
      .then(function(datas) {
        if (datas === null) {
          ctx.setState({
            signupError: true
          });
        } else {
          ctx.setState({
            currentUser: datas._id
          });
          ctx.props.userlogged(datas);
        }
      });
  }

  submitlogin(values) {
    var ctx = this;
    var formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);
    fetch("/login", {
      method: "post",
      body: formData
    })
      .then(response => response.json())
      .then(function(datas) {
        if (datas === "ko") {
          ctx.setState({
            loginError: true
          });
        } else {
          ctx.setState({
            currentUser: datas
          });
          ctx.props.userlogged(datas);
        }
      });
  }

  render() {
    if (
      this.props.isLogged != undefined &&
      this.props.isLogged != null &&
      this.props.isLogged != ""
    ) {
      return <Redirect to="/" />;
    } else {
      return (
        <div>
          <Navbar />
          <SignupForm buglog={this.state.signupError} onSubmit={this.submit} />
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

function mapDispatchToProps(dispatch, props) {
  return {
    userlogged: function(value) {
      dispatch({ type: "logged", currentUser: value });
    }
  };
}

function mapStateToProps(state) {
  return { isLogged: state.currentUser };
}

var SignupLoginRedux = connect(mapStateToProps, mapDispatchToProps)(
  SignupLogin
);

export default SignupLoginRedux;
