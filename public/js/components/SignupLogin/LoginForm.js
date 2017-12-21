import React from "react";
import { Link } from "react-router-dom";

var Field = require("redux-form").Field;
var reduxForm = require("redux-form").reduxForm;

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var bugmessage;
    if (this.props.buglog === true) {
      bugmessage = <div>Incorrect email or password</div>;
    } else {
      bugmessage = <div />;
    }
    return (
      <div>
        <div id="page-content" className="container">
          <div className="row contact-area">
            <h4>Existing Users : Log in Here</h4>
            <div className="col-sm-6 contact-form-area">
              <div id="contact-form">
                <form
                  onSubmit={this.props.handleSubmit}
                  id="LoginForm"
                  data-toggle="validator"
                >
                  <div className="form-group">
                    <Field
                      component="input"
                      type="email"
                      className="form-control"
                      id="emailbis"
                      name="email"
                      placeholder="Email"
                    />
                    <div className="help-block with-errors" />
                  </div>
                  <div className="form-group">
                    <Field
                      component="input"
                      id="passwordbis"
                      className="form-control"
                      rows="5"
                      type="password"
                      name="password"
                      placeholder="Password"
                    />
                    <div className="help-block with-errors" />
                  </div>
                  <button
                    type="submit"
                    id="LoginForm-submit"
                    className="btn btn-md btn-primary-filled btn-form-submit"
                  >
                    LOGIN
                  </button>
                  <div id="msgSubmit" className="h3 text-center hidden" />
                  <div className="clearfix" />
                </form>
                {bugmessage}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

var LoginFormRedux = reduxForm({
  form: "LoginForm"
})(LoginForm);

export default LoginFormRedux;
