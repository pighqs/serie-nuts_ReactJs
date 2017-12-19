import React from "react";
import { Link } from "react-router-dom";

var Field = require('redux-form').Field;
var reduxForm = require('redux-form').reduxForm;


class Contact extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <div id="page-content" className="container">
          <div className="row">
            <div className="col-sm-4 contact-info text-center space-bottom">
              <div className="contact-icon">
                <i className="lnr lnr-map-marker" />
              </div>
              <h5>ADDRESS</h5>
              <p>151 rue St Denis</p>
              <p>75002 Paris, France</p>
            </div>

            <div className="col-sm-4 contact-info text-center space-bottom">
              <div className="contact-icon">
                <i className="lnr lnr-smartphone" />
              </div>
              <h5>PHONE</h5>
              <p>
                Office: <a href="tel:+33625141414">+33 6 25 14 14 14</a>
              </p>
              <p>
                Support: <a href="tel:+33625141414">+33 6 25 15 15 15</a>
              </p>
            </div>

            <div className="col-sm-4 contact-info text-center space-bottom">
              <div className="contact-icon">
                <i className="lnr lnr-envelope" />
              </div>
              <h5>EMAIL</h5>
              <p>
                Office:{" "}
                <a href="mailto:office@serienuts.com">office@serienuts.com</a>
              </p>
              <p>
                Support:{" "}
                <a href="mailto:support@serienuts.com">hello@serienuts.com</a>
              </p>
            </div>
          </div>

          <div className="row contact-area">
            <div className="col-sm-6 map">
              <div id="map" />
            </div>

            <div className="col-sm-6 contact-form-area">
              <div id="contact-form">
                <form onSubmit={ this.props.handleSubmit } id="contactForm" data-toggle="validator">
                  <div className="form-group">
                    <Field
                      component="input"
                      type="text"
                      className="form-control"
                      id="name"
                      name="fullname"
                      placeholder="Full Name"
                    />
                    <div className="help-block with-errors" />
                  </div>
                  <div className="form-group">
                    <Field
                      component="input"
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Email"
                    />
                    <div className="help-block with-errors" />
                  </div>
                  <div className="form-group">
                    <Field
                      component="input"
                      id="message"
                      className="form-control"
                      rows="5"
                      name="message"
                      placeholder="Message"
                    />
                    <div className="help-block with-errors" />
                  </div>
                  <button
                    type="submit"
                    id="form-submit"
                    className="btn btn-md btn-primary-filled btn-form-submit"
                  >
                    SUBMIT FORM
                  </button>
                  <div id="msgSubmit" className="h3 text-center hidden" />
                  <div className="clearfix" />
                </form>
              </div>
            </div>
          </div>
        </div>
       
      </div>
    );
  }
}

var ContactRedux = reduxForm({
  form: 'contact'
})(Contact)


export default ContactRedux;
