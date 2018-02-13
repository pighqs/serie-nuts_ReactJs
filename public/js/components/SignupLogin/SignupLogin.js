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
      .then(function(savedUser) {
        if (savedUser === null) {
          ctx.setState({
            signupError: true
          });
        } else {
          ctx.setState({
            currentUser: savedUser._id
          });
          ctx.props.userlogged(savedUser._id);
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
      .then(function(testLogin) {
        if (testLogin === "ko") {
          ctx.setState({
            loginError: true
          });
        } else {
          ctx.setState({
            currentUser: testLogin
          });
          ctx.props.userlogged(testLogin);
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
          <div className="min-vh">
            <SignupForm
              buglog={this.state.signupError}
              onSubmit={this.submit}
            />
            <LoginForm
              buglog={this.state.loginError}
              onSubmit={this.submitlogin}
            />
          </div>
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
