import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

class Logout extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
      this.props.userlogged();
  }

  render() {
    return <Redirect to="/" />;
  }
}

function mapDispatchToProps(dispatch, props) {
    return {
      userlogged: function(value) {
        dispatch({ type: "logged", currentUser: "" });
      }
    };
  }


var LogoutRedux = connect(null, mapDispatchToProps)(Logout);

export default LogoutRedux;
